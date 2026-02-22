<?php

namespace App\Utilities;

use App\Models\Category;
use App\Models\SocialMediaType;

class Utility
{
    public static function updateSocialMedias($user, $data)
    {
        $map = [
            'instagram' => 'Instagram',
            'linkedin' => 'Linkedin',
            'github' => 'Github',
        ];

        foreach ($map as $field => $typeName) {
            $url = $data[$field];
            $type = SocialMediaType::where('name', $typeName)->first();

            if (!$type) {
                continue;
            }

            if ($url) {
                $user->socialMedias()->updateOrCreate(
                    ['social_media_type_id' => $type->id],
                    ['url' => $url]
                );
            } else {
                $user->socialMedias()
                    ->where('social_media_type_id', $type->id)
                    ->delete();
            }
        }
    }

    public static function getParentCategories()
    {
        $categories = Category::with('parent')
            ->whereNull('parent_id')
            ->select(['id', 'name'])
            ->get();

        return $categories;
    }

    public static function getSubCategories()
    {
        $categories = Category::query()
            ->whereNotNull('parent_id')
            ->select(['id', 'name'])
            ->get();

        return $categories;
    }

    public static function getYoutubeEmbedUrl(?string $url): ?string
    {
        if (!$url) {
            return null;
        }

        $host = parse_url($url, PHP_URL_HOST);
        $isYoutube = str_contains($host, 'youtube.com') || str_contains($host, 'youtu.be');

        if (!$isYoutube) {
            return $url;
        }

        if (str_contains($host, 'youtu.be')) {
            $id = trim(parse_url($url, PHP_URL_PATH), '/');
        } else {
            parse_str(parse_url($url, PHP_URL_QUERY), $query);
            $id = $query['v'] ?? null;
        }

        if (!$id) {
            return null;
        }

        return "https://www.youtube.com/embed/" . $id;
    }
}
