import { useState } from 'react';
import DetailImage from '../detail-image';
import DetailInput from '../detail-input';
import DetailSelect from '../detail-select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function CourseInformation({ course, categories, errors }: any) {
    const [category, setCategory] = useState(course?.category_id);
    const [image, setImage] = useState(course?.image);

    const categorySelect = categories.map((cat: any) => ({
        value: cat.id,
        label: cat.name,
    }));

    const handleCategoryChange = (val: any) => {
        setCategory(val);
    };

    const handleImageChange = (files: (File | string)[]) => {
        setImage(files[files.length - 1] || null);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Course Information</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div>
                    <DetailInput type="text" name="name" id="name" title="Name" value={course?.name} />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div>
                    <DetailInput type="textarea" name="description" id="description" title="Description" value={course?.description} />
                    {errors.description && <p className="text-red-500">{errors.description}</p>}
                </div>
                <div>
                    <DetailSelect
                        id={`category`}
                        name={`category`}
                        options={categorySelect}
                        title={`Category`}
                        value={String(category)}
                        onChange={(val) => handleCategoryChange(val)}
                    />
                    {errors[`category`] && <p className="text-red-500">{errors[`category`]}</p>}
                </div>
                <div>
                    <DetailImage
                        name="course_images"
                        images={image ? [image] : []}
                        onChange={handleImageChange}
                        index={0}
                        multiple={false}
                        ref={false}
                    />
                    {errors[`course_images`] && <p className="text-red-500">{errors[`course_images`]}</p>}
                </div>
            </CardContent>
        </Card>
    );
}
