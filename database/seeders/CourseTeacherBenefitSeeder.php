<?php

namespace Database\Seeders;

use App\Models\CourseTeacherBenefit;
use Illuminate\Database\Seeder;

class CourseTeacherBenefitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courseTeacherBenefits = [
            ['course_id' => 1, 'description' => 'Enhance foundational understanding of AI to teach advanced materials.'],
            ['course_id' => 1, 'description' => 'Gain experience explaining AI concepts to beginners.'],
            ['course_id' => 1, 'description' => 'Expand portfolio as an AI instructor.'],

            ['course_id' => 2, 'description' => 'Develop skills in creating basic ML learning modules.'],
            ['course_id' => 2, 'description' => 'Opportunity to guide students in supervised learning projects.'],
            ['course_id' => 2, 'description' => 'Increase credibility as a machine learning instructor.'],

            ['course_id' => 3, 'description' => 'Improve competence in teaching neural networks.'],
            ['course_id' => 3, 'description' => 'Opportunity to teach trending deep learning topics.'],
            ['course_id' => 3, 'description' => 'Gain experience teaching real-world deep learning models.'],

            ['course_id' => 4, 'description' => 'Strengthen AI knowledge for industry and business applications.'],
            ['course_id' => 4, 'description' => 'Opportunity to interact with students from corporate backgrounds.'],
            ['course_id' => 4, 'description' => 'Gain experience teaching AI use cases in enterprise settings.'],

            ['course_id' => 5, 'description' => 'Become proficient in creating prompts for various needs.'],
            ['course_id' => 5, 'description' => 'Enhance reputation as an LLM practitioner.'],
            ['course_id' => 5, 'description' => 'Teach a highly in-demand industry skill.'],

            ['course_id' => 6, 'description' => 'Strengthen foundational networking knowledge for teaching.'],
            ['course_id' => 6, 'description' => 'Opportunity to guide students in basic network configuration.'],
            ['course_id' => 6, 'description' => 'Boost portfolio as a networking instructor.'],

            ['course_id' => 7, 'description' => 'Increase credibility as a Cisco-certified instructor.'],
            ['course_id' => 7, 'description' => 'Gain experience delivering hands-on CCNA training.'],
            ['course_id' => 7, 'description' => 'Opportunity to teach international certification materials.'],

            ['course_id' => 8, 'description' => 'Enhance understanding of network security.'],
            ['course_id' => 8, 'description' => 'Teach firewall, VPN, and secure architecture concepts.'],
            ['course_id' => 8, 'description' => 'Gain experience teaching essential security fundamentals.'],

            ['course_id' => 9, 'description' => 'Develop experience teaching wireless network management.'],
            ['course_id' => 9, 'description' => 'Opportunity to deepen wireless optimization skills.'],
            ['course_id' => 9, 'description' => 'Enhance competence in modern wireless networks.'],

            ['course_id' => 10, 'description' => 'Enhance troubleshooting and network problem-solving skills.'],
            ['course_id' => 10, 'description' => 'Opportunity to train students in real-world troubleshooting.'],
            ['course_id' => 10, 'description' => 'Gain experience teaching network diagnostics.'],

            ['course_id' => 11, 'description' => 'Increase credibility as a cybersecurity instructor.'],
            ['course_id' => 11, 'description' => 'Improve understanding of modern security threats.'],
            ['course_id' => 11, 'description' => 'Opportunity to teach cybersecurity concepts to beginners.'],

            ['course_id' => 12, 'description' => 'Enhance capability in teaching penetration testing.'],
            ['course_id' => 12, 'description' => 'Opportunity to train students through hacking simulations.'],
            ['course_id' => 12, 'description' => 'Gain experience in ethical hacking practices.'],

            ['course_id' => 13, 'description' => 'Opportunity to teach digital investigation techniques.'],
            ['course_id' => 13, 'description' => 'Improve competence in forensic analysis.'],
            ['course_id' => 13, 'description' => 'Gain hands-on experience handling digital forensic cases.'],

            ['course_id' => 14, 'description' => 'Develop competence in cloud security.'],
            ['course_id' => 14, 'description' => 'Opportunity to teach modern cloud security practices.'],
            ['course_id' => 14, 'description' => 'Increase credibility as a cloud security instructor.'],

            ['course_id' => 15, 'description' => 'Improve capability in threat intelligence analysis.'],
            ['course_id' => 15, 'description' => 'Opportunity to teach threat identification processes.'],
            ['course_id' => 15, 'description' => 'Gain experience in threat reporting.'],

            ['course_id' => 16, 'description' => 'Opportunity to teach IaaS, PaaS, and SaaS concepts.'],
            ['course_id' => 16, 'description' => 'Deepen understanding of cloud architecture.'],
            ['course_id' => 16, 'description' => 'Increase credibility as a cloud instructor.'],

            ['course_id' => 17, 'description' => 'Develop competence in AWS cloud services.'],
            ['course_id' => 17, 'description' => 'Opportunity to teach AWS certification material.'],
            ['course_id' => 17, 'description' => 'Gain experience in AWS cloud architecture.'],

            ['course_id' => 18, 'description' => 'Improve understanding of Google Cloud services.'],
            ['course_id' => 18, 'description' => 'Opportunity to train students using GCP tools.'],
            ['course_id' => 18, 'description' => 'Expand portfolio as a GCP cloud instructor.'],

            ['course_id' => 19, 'description' => 'Gain experience teaching container orchestration.'],
            ['course_id' => 19, 'description' => 'Opportunity to teach CI/CD and Kubernetes workflows.'],
            ['course_id' => 19, 'description' => 'Increase competence as a DevOps professional.'],

            ['course_id' => 20, 'description' => 'Develop ability to teach infrastructure-as-code.'],
            ['course_id' => 20, 'description' => 'Opportunity to teach real-world cloud automation.'],
            ['course_id' => 20, 'description' => 'Increase credibility as a Terraform instructor.'],

            ['course_id' => 21, 'description' => 'Opportunity to teach Python and basic data processing.'],
            ['course_id' => 21, 'description' => 'Gain experience teaching beginner-level data science.'],
            ['course_id' => 21, 'description' => 'Improve competence in teaching data analysis.'],

            ['course_id' => 22, 'description' => 'Improve ability to teach statistical concepts.'],
            ['course_id' => 22, 'description' => 'Opportunity to explain probability and distributions.'],
            ['course_id' => 22, 'description' => 'Increase credibility as a data science statistics instructor.'],

            ['course_id' => 23, 'description' => 'Develop ability to teach data visualization.'],
            ['course_id' => 23, 'description' => 'Opportunity to build interactive dashboards with students.'],
            ['course_id' => 23, 'description' => 'Enhance portfolio as a Tableau instructor.'],

            ['course_id' => 24, 'description' => 'Improve competence in teaching Pandas and NumPy.'],
            ['course_id' => 24, 'description' => 'Opportunity to guide students in real-world data analysis.'],
            ['course_id' => 24, 'description' => 'Gain experience teaching data manipulation.'],

            ['course_id' => 25, 'description' => 'Opportunity to teach more complex ML models.'],
            ['course_id' => 25, 'description' => 'Gain experience working with intermediate datasets.'],
            ['course_id' => 25, 'description' => 'Enhance reputation as an advanced ML instructor.'],

            ['course_id' => 26, 'description' => 'Opportunity to teach basic frontend development.'],
            ['course_id' => 26, 'description' => 'Increase skill in teaching HTML and CSS.'],
            ['course_id' => 26, 'description' => 'Gain experience teaching beginner web development.'],

            ['course_id' => 27, 'description' => 'Improve competence in teaching modern JavaScript.'],
            ['course_id' => 27, 'description' => 'Opportunity to teach web interactivity.'],
            ['course_id' => 27, 'description' => 'Expand portfolio as a JavaScript instructor.'],

            ['course_id' => 28, 'description' => 'Opportunity to teach React and modern frontend development.'],
            ['course_id' => 28, 'description' => 'Gain experience working on large frontend projects.'],
            ['course_id' => 28, 'description' => 'Expand portfolio as a professional frontend instructor.'],

            ['course_id' => 29, 'description' => 'Opportunity to teach Laravel REST API development.'],
            ['course_id' => 29, 'description' => 'Increase experience teaching backend frameworks.'],
            ['course_id' => 29, 'description' => 'Strengthen reputation as a Laravel instructor.'],

            ['course_id' => 30, 'description' => 'Opportunity to teach end-to-end fullstack projects.'],
            ['course_id' => 30, 'description' => 'Gain experience designing fullstack systems.'],
            ['course_id' => 30, 'description' => 'Increase credibility as a fullstack trainer.'],

            ['course_id' => 31, 'description' => 'Opportunity to teach basic Photoshop skills.'],
            ['course_id' => 31, 'description' => 'Gain experience guiding image editing.'],
            ['course_id' => 31, 'description' => 'Enhance portfolio as a design instructor.'],

            ['course_id' => 32, 'description' => 'Improve ability to teach photo manipulation techniques.'],
            ['course_id' => 32, 'description' => 'Opportunity to teach blending and retouching.'],
            ['course_id' => 32, 'description' => 'Increase credibility in graphic design.'],

            ['course_id' => 33, 'description' => 'Opportunity to teach layout and typography.'],
            ['course_id' => 33, 'description' => 'Gain experience in professional poster design.'],
            ['course_id' => 33, 'description' => 'Expand portfolio in print design.'],

            ['course_id' => 34, 'description' => 'Opportunity to teach advanced retouching techniques.'],
            ['course_id' => 34, 'description' => 'Deepen professional photo-editing skills.'],
            ['course_id' => 34, 'description' => 'Gain experience teaching complex editing workflows.'],

            ['course_id' => 35, 'description' => 'Opportunity to teach digital art creation.'],
            ['course_id' => 35, 'description' => 'Gain experience using digital brushes effectively.'],
            ['course_id' => 35, 'description' => 'Expand portfolio as a digital illustration instructor.'],

            ['course_id' => 36, 'description' => 'Opportunity to teach basic vector design.'],
            ['course_id' => 36, 'description' => 'Improve skills in teaching Illustrator core tools.'],
            ['course_id' => 36, 'description' => 'Enhance reputation as a vector design instructor.'],

            ['course_id' => 37, 'description' => 'Opportunity to teach professional logo design.'],
            ['course_id' => 37, 'description' => 'Gain experience in branding design.'],
            ['course_id' => 37, 'description' => 'Increase credibility as a logo designer trainer.'],

            ['course_id' => 38, 'description' => 'Opportunity to teach illustration techniques.'],
            ['course_id' => 38, 'description' => 'Develop skills teaching brushes and drawing tools.'],
            ['course_id' => 38, 'description' => 'Gain experience as a professional digital illustrator.'],

            ['course_id' => 39, 'description' => 'Opportunity to teach vector poster creation.'],
            ['course_id' => 39, 'description' => 'Enhance ability to teach vector layout techniques.'],
            ['course_id' => 39, 'description' => 'Expand portfolio in creative poster design.'],

            ['course_id' => 40, 'description' => 'Opportunity to teach mesh and blending techniques.'],
            ['course_id' => 40, 'description' => 'Increase competence in teaching advanced vector design.'],
            ['course_id' => 40, 'description' => 'Become an advanced Illustrator-level instructor.'],

            ['course_id' => 41, 'description' => 'Opportunity to teach 3D modeling and rendering.'],
            ['course_id' => 41, 'description' => 'Expand portfolio in 3D design.'],
            ['course_id' => 41, 'description' => 'Gain experience as a Blender instructor.'],

            ['course_id' => 42, 'description' => 'Opportunity to teach 3D animation workflows.'],
            ['course_id' => 42, 'description' => 'Increase experience in character animation.'],
            ['course_id' => 42, 'description' => 'Expand portfolio as a 3D animation instructor.'],

            ['course_id' => 43, 'description' => 'Opportunity to teach character sculpting.'],
            ['course_id' => 43, 'description' => 'Improve digital sculpting skills.'],
            ['course_id' => 43, 'description' => 'Expand portfolio as a digital sculpting artist.'],

            ['course_id' => 44, 'description' => 'Opportunity to teach basic VFX creation.'],
            ['course_id' => 44, 'description' => 'Improve competence in visual effects.'],
            ['course_id' => 44, 'description' => 'Expand portfolio as a VFX instructor.'],

            ['course_id' => 45, 'description' => 'Opportunity to teach game asset creation.'],
            ['course_id' => 45, 'description' => 'Develop skills in low-poly design.'],
            ['course_id' => 45, 'description' => 'Expand portfolio as a game asset artist.'],

            ['course_id' => 46, 'description' => 'Opportunity to teach fundamental color theory.'],
            ['course_id' => 46, 'description' => 'Increase credibility as a color theory instructor.'],
            ['course_id' => 46, 'description' => 'Expand portfolio in visual design.'],

            ['course_id' => 47, 'description' => 'Opportunity to teach professional color grading.'],
            ['course_id' => 47, 'description' => 'Gain experience in advanced color editing.'],
            ['course_id' => 47, 'description' => 'Increase credibility as a color grading instructor.'],

            ['course_id' => 48, 'description' => 'Opportunity to teach color composition techniques.'],
            ['course_id' => 48, 'description' => 'Gain experience teaching art and design theory.'],
            ['course_id' => 48, 'description' => 'Expand portfolio as an art instructor.'],

            ['course_id' => 49, 'description' => 'Opportunity to teach color use in branding.'],
            ['course_id' => 49, 'description' => 'Increase experience in visual branding.'],
            ['course_id' => 49, 'description' => 'Enhance credibility as a branding consultant.'],

            ['course_id' => 50, 'description' => 'Opportunity to teach advanced color psychology.'],
            ['course_id' => 50, 'description' => 'Gain experience in color research for UX and marketing.'],
            ['course_id' => 50, 'description' => 'Strengthen reputation as a color psychology expert.'],

            ['course_id' => 51, 'description' => 'Opportunity to teach basic UI design.'],
            ['course_id' => 51, 'description' => 'Improve experience using Figma professionally.'],
            ['course_id' => 51, 'description' => 'Expand portfolio as a UI design instructor.'],

            ['course_id' => 52, 'description' => 'Opportunity to teach interactive prototyping.'],
            ['course_id' => 52, 'description' => 'Gain experience in UX prototyping workflows.'],
            ['course_id' => 52, 'description' => 'Enhance credibility as a UX prototyping instructor.'],

            ['course_id' => 53, 'description' => 'Opportunity to teach design system development.'],
            ['course_id' => 53, 'description' => 'Gain experience managing UI libraries.'],
            ['course_id' => 53, 'description' => 'Increase credibility as a design system architect.'],

            ['course_id' => 54, 'description' => 'Opportunity to teach mobile UI design.'],
            ['course_id' => 54, 'description' => 'Increase competence in mobile experience design.'],
            ['course_id' => 54, 'description' => 'Expand portfolio as a mobile UI instructor.'],

            ['course_id' => 55, 'description' => 'Opportunity to teach advanced auto-layout techniques.'],
            ['course_id' => 55, 'description' => 'Develop skills in teaching Figma animations.'],
            ['course_id' => 55, 'description' => 'Become an advanced-level Figma instructor.'],
        ];

        foreach ($courseTeacherBenefits as $courseTeacherBenefit) {
            $courseTeacherBenefit['course_id'] += 5;
            CourseTeacherBenefit::firstOrCreate($courseTeacherBenefit);
        }
    }
}
