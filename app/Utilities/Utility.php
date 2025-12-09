<?php

namespace App\Utilities;

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
}
