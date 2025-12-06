<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $skills = [
            [
                'name' => 'Python',
                'category_id' => 1
            ],
            [
                'name' => 'JavaScript',
                'category_id' => 1
            ],
            [
                'name' => 'PHP',
                'category_id' => 1
            ],
            [
                'name' => 'HTML5',
                'category_id' => 1
            ],
            [
                'name' => 'CSS3',
                'category_id' => 1
            ],
            [
                'name' => 'SQL',
                'category_id' => 1
            ],
            [
                'name' => 'C++',
                'category_id' => 1
            ],

            [
                'name' => 'Artificial Intelligence',
                'category_id' => 1
            ],
            [
                'name' => 'Machine Learning',
                'category_id' => 1
            ],
            [
                'name' => 'Deep Learning',
                'category_id' => 1
            ],
            [
                'name' => 'Neural Networks',
                'category_id' => 1
            ],
            [
                'name' => 'Data Science',
                'category_id' => 1
            ],
            [
                'name' => 'Data Analysis',
                'category_id' => 1
            ],
            [
                'name' => 'Statistics',
                'category_id' => 1
            ],
            [
                'name' => 'Computer Vision',
                'category_id' => 1
            ],
            [
                'name' => 'Natural Language Processing',
                'category_id' => 1
            ],
            [
                'name' => 'Prompt Engineering',
                'category_id' => 1
            ],
            [
                'name' => 'Tableau',
                'category_id' => 1
            ],
            [
                'name' => 'Pandas',
                'category_id' => 1
            ],

            [
                'name' => 'Networking',
                'category_id' => 1
            ],
            [
                'name' => 'TCP/IP',
                'category_id' => 1
            ],
            [
                'name' => 'Cisco IOS',
                'category_id' => 1
            ],
            [
                'name' => 'Routing & Switching',
                'category_id' => 1
            ],
            [
                'name' => 'Network Security',
                'category_id' => 1
            ],
            [
                'name' => 'Cybersecurity',
                'category_id' => 1
            ],
            [
                'name' => 'Ethical Hacking',
                'category_id' => 1
            ],
            [
                'name' => 'Penetration Testing',
                'category_id' => 1
            ],
            [
                'name' => 'Digital Forensics',
                'category_id' => 1
            ],
            [
                'name' => 'Wireshark',
                'category_id' => 1
            ],
            [
                'name' => 'Cryptography',
                'category_id' => 1
            ],
            [
                'name' => 'Wireless Security',
                'category_id' => 1
            ],

            [
                'name' => 'Cloud Computing',
                'category_id' => 1
            ],
            [
                'name' => 'AWS',
                'category_id' => 1
            ],
            [
                'name' => 'Google Cloud Platform',
                'category_id' => 1
            ],
            [
                'name' => 'Azure',
                'category_id' => 1
            ],
            [
                'name' => 'DevOps',
                'category_id' => 1
            ],
            [
                'name' => 'Docker',
                'category_id' => 1
            ],
            [
                'name' => 'Kubernetes',
                'category_id' => 1
            ],
            [
                'name' => 'Terraform',
                'category_id' => 1
            ],
            [
                'name' => 'Virtualization',
                'category_id' => 1
            ],
            [
                'name' => 'Linux Administration',
                'category_id' => 1
            ],

            [
                'name' => 'Web Development',
                'category_id' => 1
            ],
            [
                'name' => 'Frontend Development',
                'category_id' => 1
            ],
            [
                'name' => 'Backend Development',
                'category_id' => 1
            ],
            [
                'name' => 'React.js',
                'category_id' => 1
            ],
            [
                'name' => 'Laravel',
                'category_id' => 1
            ],
            [
                'name' => 'Tailwind CSS',
                'category_id' => 1
            ],
            [
                'name' => 'REST API',
                'category_id' => 1
            ],
            [
                'name' => 'Fullstack Development',
                'category_id' => 1
            ],

            [
                'name' => 'Graphic Design',
                'category_id' => 2
            ],
            [
                'name' => 'Adobe Photoshop',
                'category_id' => 2
            ],
            [
                'name' => 'Adobe Illustrator',
                'category_id' => 2
            ],
            [
                'name' => 'Photo Manipulation',
                'category_id' => 2
            ],
            [
                'name' => 'Vector Art',
                'category_id' => 2
            ],
            [
                'name' => 'Logo Design',
                'category_id' => 2
            ],
            [
                'name' => 'Digital Painting',
                'category_id' => 2
            ],
            [
                'name' => 'Typography',
                'category_id' => 2
            ],

            [
                'name' => '3D Modeling',
                'category_id' => 2
            ],
            [
                'name' => 'Blender',
                'category_id' => 2
            ],
            [
                'name' => '3D Animation',
                'category_id' => 2
            ],
            [
                'name' => 'Sculpting',
                'category_id' => 2
            ],
            [
                'name' => 'VFX',
                'category_id' => 2
            ],
            [
                'name' => 'Game Asset Creation',
                'category_id' => 2
            ],

            [
                'name' => 'UI/UX Design',
                'category_id' => 2
            ],
            [
                'name' => 'Figma',
                'category_id' => 2
            ],
            [
                'name' => 'Prototyping',
                'category_id' => 2
            ],
            [
                'name' => 'Wireframing',
                'category_id' => 2
            ],
            [
                'name' => 'Design Systems',
                'category_id' => 2
            ],
            [
                'name' => 'Mobile App Design',
                'category_id' => 2
            ],
            [
                'name' => 'Color Theory',
                'category_id' => 2
            ],
            [
                'name' => 'Color Grading',
                'category_id' => 2
            ],
            [
                'name' => 'Visual Design',
                'category_id' => 2
            ],
        ];

        foreach ($skills as $skill) {
            Skill::firstOrCreate([
                'name' => $skill['name'],
                'category_id' => $skill['category_id']
            ]);
        }
    }
}
