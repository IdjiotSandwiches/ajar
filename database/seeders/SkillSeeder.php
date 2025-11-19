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
            ['name' => 'Python'],
            ['name' => 'JavaScript'],
            ['name' => 'PHP'],
            ['name' => 'HTML5'],
            ['name' => 'CSS3'],
            ['name' => 'SQL'],
            ['name' => 'C++'],
            
            ['name' => 'Artificial Intelligence'],
            ['name' => 'Machine Learning'],
            ['name' => 'Deep Learning'],
            ['name' => 'Neural Networks'],
            ['name' => 'Data Science'],
            ['name' => 'Data Analysis'],
            ['name' => 'Statistics'],
            ['name' => 'Computer Vision'],
            ['name' => 'Natural Language Processing'],
            ['name' => 'Prompt Engineering'],
            ['name' => 'Tableau'],
            ['name' => 'Pandas'],
            
            ['name' => 'Networking'],
            ['name' => 'TCP/IP'],
            ['name' => 'Cisco IOS'],
            ['name' => 'Routing & Switching'],
            ['name' => 'Network Security'],
            ['name' => 'Cybersecurity'],
            ['name' => 'Ethical Hacking'],
            ['name' => 'Penetration Testing'],
            ['name' => 'Digital Forensics'],
            ['name' => 'Wireshark'],
            ['name' => 'Cryptography'],
            ['name' => 'Wireless Security'],
            
            ['name' => 'Cloud Computing'],
            ['name' => 'AWS'],
            ['name' => 'Google Cloud Platform'],
            ['name' => 'Azure'],
            ['name' => 'DevOps'],
            ['name' => 'Docker'],
            ['name' => 'Kubernetes'],
            ['name' => 'Terraform'],
            ['name' => 'Virtualization'],
            ['name' => 'Linux Administration'],
            
            ['name' => 'Web Development'],
            ['name' => 'Frontend Development'],
            ['name' => 'Backend Development'],
            ['name' => 'React.js'],
            ['name' => 'Laravel'],
            ['name' => 'Tailwind CSS'],
            ['name' => 'REST API'],
            ['name' => 'Fullstack Development'],
            
            ['name' => 'Graphic Design'],
            ['name' => 'Adobe Photoshop'],
            ['name' => 'Adobe Illustrator'],
            ['name' => 'Photo Manipulation'],
            ['name' => 'Vector Art'],
            ['name' => 'Logo Design'],
            ['name' => 'Digital Painting'],
            ['name' => 'Typography'],
            
            ['name' => '3D Modeling'],
            ['name' => 'Blender'],
            ['name' => '3D Animation'],
            ['name' => 'Sculpting'],
            ['name' => 'VFX'],
            ['name' => 'Game Asset Creation'],
            
            ['name' => 'UI/UX Design'],
            ['name' => 'Figma'],
            ['name' => 'Prototyping'],
            ['name' => 'Wireframing'],
            ['name' => 'Design Systems'],
            ['name' => 'Mobile App Design'],
            ['name' => 'Color Theory'],
            ['name' => 'Color Grading'],
            ['name' => 'Visual Design'],
        ];

        foreach ($skills as $skill) {
            Skill::firstOrCreate(['name' => $skill['name']]);
        }
    }
}
