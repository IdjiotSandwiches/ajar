<?php

namespace App\Services\Admin;

use App\Models\User;
use App\Models\Institute;
use App\Models\CourseSchedule;
use App\Enums\CourseStatusEnum;
use App\Services\PaymentService;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;

class AdminInstituteService
{
    private PaymentService $service;

    public function __construct(PaymentService $service)
    {
        $this->service = $service;
    }

    public function getInstituteList($filters)
    {
        $institutes = Institute::with(['user', 'category', 'courses', 'reviews'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->withCount('courses')
            ->when(!empty($filters['search']), fn($q) => $q->whereRelation('user', 'name', 'like', "%{$filters['search']}%"))
            ->when(!empty($filters['category_id']), fn($q) => $q->where('category_id', $filters['category_id']))
            ->when(!empty($filters['count']), fn($q) => $q->having('courses_count', '=', $filters['count']))
            ->when(!empty($filters['rating']), function ($query) use ($filters) {
                $query->whereHas('reviews', function ($q) use ($filters) {
                    $q->groupBy('institute_id')
                        ->havingRaw('ROUND(AVG(rating)) = ?', [$filters['rating']]);
                });
            })
            ->paginate(10)
            ->through(fn($item) => [
                'id' => $item->user_id,
                'name' => $item->user->name,
                'reviews_avg_rating' => round($item->reviews_avg_rating ?? 0, 1),
                'reviews_count' => $item->reviews_count,
                'courses_count' => $item->courses_count,
                'category' => $item->category->name
            ]);

        return $institutes;
    }

    public function removeInstitute($id)
    {
        Institute::findOrFail($id);
        $scheduleIds = [];
        DB::transaction(function () use ($id, &$scheduleIds) {
            $scheduleIds = CourseSchedule::with(['course'])
                ->whereHas('course', fn($q) => $q->where('institute_id', $id))
                ->pluck('id')
                ->toArray();

            CourseSchedule::query()
                ->whereIn('id', $scheduleIds)
                ->update([
                    'status' => CourseStatusEnum::Cancelled
                ]);
        });

        $jobs = $this->service->handleRefund($scheduleIds);
        if (!empty($jobs)) {
            Bus::batch($jobs)
                ->then(fn($batch) => User::findOrFail($id)->delete())
                ->name('Handle course refunds (Institute Removal)')
                ->dispatch();
        }
    }
}
