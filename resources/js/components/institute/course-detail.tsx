import DetailInput from '../detail-input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function CourseDetail({ course, errors }: any) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div>
                    <DetailInput type="number" min={0} title="Duration (Minutes)" name="duration" id="duration" value={course?.duration} />
                    {errors[`duration`] && <p className="text-red-500">{errors[`duration`]}</p>}
                </div>
                <div>
                    <DetailInput type="number" min={0} title="Price for Student (Rp)" name="price" id="price" value={course?.price} />
                    {errors[`price`] && <p className="text-red-500">{errors[`price`]}</p>}
                </div>
                <div>
                    <DetailInput type="number" min={0} title="Discount (%)" name="discount" id="discount" value={course?.discount} />
                    {errors[`discount`] && <p className="text-red-500">{errors[`discount`]}</p>}
                </div>
                <div>
                    <DetailInput
                        type="number"
                        min={0}
                        title="Teacher Salary (/Session)"
                        name="teacher_salary"
                        id="teacher_salary"
                        value={course?.teacher_salary}
                    />
                    {errors[`teacher_salary`] && <p className="text-red-500">{errors[`teacher_salary`]}</p>}
                </div>
            </CardContent>
        </Card>
    );
}
