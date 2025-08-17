<?php

namespace App\Utilities;

use Illuminate\Http\UploadedFile;

class UploadUtility
{
    /**
     * Upload image utility as folder path
     *
     * @param \Illuminate\Http\UploadedFile $file
     * @param string $folder
     * @return string|null
     */
    public static function upload(UploadedFile $file, string $folder): string|null
    {
        if (!$file instanceof UploadedFile)
            return null;

        $path = $file->store($folder, 'public');
        return asset("storage/$path");
    }
}
