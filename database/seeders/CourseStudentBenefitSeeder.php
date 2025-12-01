<?php

namespace Database\Seeders;

use App\Models\CourseStudentBenefit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseStudentBenefitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courseStudentBenefits = [
            ['course_id' => 1, 'description' => 'Understand the core concepts of artificial intelligence'],
            ['course_id' => 1, 'description' => 'Learn how agents and search algorithms work'],
            ['course_id' => 1, 'description' => 'Develop problem-solving skills using basic AI techniques'],

            ['course_id' => 2, 'description' => 'Understand supervised and unsupervised learning'],
            ['course_id' => 2, 'description' => 'Learn how to train and evaluate ML models'],
            ['course_id' => 2, 'description' => 'Gain experience working with real-world datasets'],

            ['course_id' => 3, 'description' => 'Understand neural network architectures'],
            ['course_id' => 3, 'description' => 'Learn forward and backward propagation'],
            ['course_id' => 3, 'description' => 'Build simple models using deep learning frameworks'],

            ['course_id' => 4, 'description' => 'Learn how AI can automate business workflows'],
            ['course_id' => 4, 'description' => 'Understand data-driven decision making'],
            ['course_id' => 4, 'description' => 'Discover real-world AI applications in industry'],

            ['course_id' => 5, 'description' => 'Learn how to design effective prompts for LLMs'],
            ['course_id' => 5, 'description' => 'Understand context control and role prompting'],
            ['course_id' => 5, 'description' => 'Improve productivity using AI-powered workflows'],

            ['course_id' => 6, 'description' => 'Understand how computer networks operate'],
            ['course_id' => 6, 'description' => 'Learn IP addressing, routing, and switching'],
            ['course_id' => 6, 'description' => 'Develop troubleshooting skills for basic networking issues'],

            ['course_id' => 7, 'description' => 'Master core CCNA networking concepts'],
            ['course_id' => 7, 'description' => 'Practice hands-on routing and switching labs'],
            ['course_id' => 7, 'description' => 'Prepare effectively for the CCNA certification exam'],

            ['course_id' => 8, 'description' => 'Understand network security principles'],
            ['course_id' => 8, 'description' => 'Learn about firewalls, VPNs, and secure topologies'],
            ['course_id' => 8, 'description' => 'Develop awareness of common cyber threats'],

            ['course_id' => 9, 'description' => 'Understand wireless communication fundamentals'],
            ['course_id' => 9, 'description' => 'Learn WiFi architecture and protocols'],
            ['course_id' => 9, 'description' => 'Gain skills in optimizing wireless networks'],

            ['course_id' => 10, 'description' => 'Learn to diagnose networking issues'],
            ['course_id' => 10, 'description' => 'Use professional network diagnostic tools'],
            ['course_id' => 10, 'description' => 'Develop problem-solving skills with real cases'],

            ['course_id' => 11, 'description' => 'Understand cybersecurity foundations'],
            ['course_id' => 11, 'description' => 'Learn essential defense techniques'],
            ['course_id' => 11, 'description' => 'Recognize and mitigate common cyber threats'],

            ['course_id' => 12, 'description' => 'Understand ethical hacking methodologies'],
            ['course_id' => 12, 'description' => 'Learn penetration testing fundamentals'],
            ['course_id' => 12, 'description' => 'Develop hands-on skills using hacking tools'],

            ['course_id' => 13, 'description' => 'Understand digital forensics workflows'],
            ['course_id' => 13, 'description' => 'Learn how to collect and preserve digital evidence'],
            ['course_id' => 13, 'description' => 'Analyze forensic data to support investigations'],

            ['course_id' => 14, 'description' => 'Understand cloud security principles'],
            ['course_id' => 14, 'description' => 'Learn how to secure cloud infrastructure'],
            ['course_id' => 14, 'description' => 'Develop awareness of cloud-based threats'],

            ['course_id' => 15, 'description' => 'Understand threat intelligence lifecycle'],
            ['course_id' => 15, 'description' => 'Learn how to collect and analyze threat data'],
            ['course_id' => 15, 'description' => 'Gain skills in reporting cyber threat insights'],

            ['course_id' => 16, 'description' => 'Understand cloud service models (IaaS, PaaS, SaaS)'],
            ['course_id' => 16, 'description' => 'Learn core cloud architecture principles'],
            ['course_id' => 16, 'description' => 'Develop familiarity with cloud platforms'],

            ['course_id' => 17, 'description' => 'Master AWS core services for the certification exam'],
            ['course_id' => 17, 'description' => 'Learn how to design scalable cloud systems'],
            ['course_id' => 17, 'description' => 'Gain hands-on experience with AWS tools'],

            ['course_id' => 18, 'description' => 'Understand the Google Cloud Platform ecosystem'],
            ['course_id' => 18, 'description' => 'Learn to use GCP compute, storage, and networking tools'],
            ['course_id' => 18, 'description' => 'Develop cloud deployment skills using GCP'],

            ['course_id' => 19, 'description' => 'Understand container orchestration concepts'],
            ['course_id' => 19, 'description' => 'Learn to deploy apps with Kubernetes'],
            ['course_id' => 19, 'description' => 'Develop DevOps automation skills'],

            ['course_id' => 20, 'description' => 'Understand infrastructure as code fundamentals'],
            ['course_id' => 20, 'description' => 'Learn to automate cloud infrastructure using Terraform'],
            ['course_id' => 20, 'description' => 'Gain experience writing reusable IaC modules'],

            ['course_id' => 21, 'description' => 'Learn Python for data analysis'],
            ['course_id' => 21, 'description' => 'Understand data preprocessing techniques'],
            ['course_id' => 21, 'description' => 'Develop data visualization skills'],

            ['course_id' => 22, 'description' => 'Understand probability and distributions'],
            ['course_id' => 22, 'description' => 'Learn hypothesis testing and statistical modeling'],
            ['course_id' => 22, 'description' => 'Apply statistical concepts to real datasets'],

            ['course_id' => 23, 'description' => 'Learn to design interactive dashboards'],
            ['course_id' => 23, 'description' => 'Understand data storytelling techniques'],
            ['course_id' => 23, 'description' => 'Gain hands-on experience with Tableau tools'],

            ['course_id' => 24, 'description' => 'Master Pandas and NumPy for data manipulation'],
            ['course_id' => 24, 'description' => 'Learn data cleaning and transformation'],
            ['course_id' => 24, 'description' => 'Work with real-world datasets in Python'],

            ['course_id' => 25, 'description' => 'Build advanced ML models using scikit-learn'],
            ['course_id' => 25, 'description' => 'Learn hyperparameter tuning and model selection'],
            ['course_id' => 25, 'description' => 'Evaluate models using industry-standard metrics'],

            ['course_id' => 26, 'description' => 'Learn core HTML and CSS syntax'],
            ['course_id' => 26, 'description' => 'Build simple responsive webpages'],
            ['course_id' => 26, 'description' => 'Understand web layout fundamentals'],

            ['course_id' => 27, 'description' => 'Learn JavaScript fundamentals and ES6'],
            ['course_id' => 27, 'description' => 'Understand DOM manipulation'],
            ['course_id' => 27, 'description' => 'Apply JS to build interactive webpages'],

            ['course_id' => 28, 'description' => 'Master React and frontend development'],
            ['course_id' => 28, 'description' => 'Build responsive interfaces with Tailwind'],
            ['course_id' => 28, 'description' => 'Develop real-world frontend projects'],

            ['course_id' => 29, 'description' => 'Learn PHP Laravel fundamentals'],
            ['course_id' => 29, 'description' => 'Build secure REST APIs'],
            ['course_id' => 29, 'description' => 'Develop full backend applications'],

            ['course_id' => 30, 'description' => 'Master both frontend and backend technologies'],
            ['course_id' => 30, 'description' => 'Build fullstack applications from scratch'],
            ['course_id' => 30, 'description' => 'Work on real-world software development projects'],

            ['course_id' => 31, 'description' => 'Learn Photoshop interface and basic tools'],
            ['course_id' => 31, 'description' => 'Perform simple photo edits and adjustments'],
            ['course_id' => 31, 'description' => 'Create beginner-level digital designs'],

            ['course_id' => 32, 'description' => 'Learn blending and retouching techniques'],
            ['course_id' => 32, 'description' => 'Understand layers and masking'],
            ['course_id' => 32, 'description' => 'Create composite photo manipulations'],

            ['course_id' => 33, 'description' => 'Learn layout and typography techniques'],
            ['course_id' => 33, 'description' => 'Design engaging poster compositions'],
            ['course_id' => 33, 'description' => 'Master color and balance in poster design'],

            ['course_id' => 34, 'description' => 'Master high-end retouching'],
            ['course_id' => 34, 'description' => 'Use advanced Photoshop tools'],
            ['course_id' => 34, 'description' => 'Enhance images with professional techniques'],

            ['course_id' => 35, 'description' => 'Learn digital painting fundamentals'],
            ['course_id' => 35, 'description' => 'Use brushes and layers effectively'],
            ['course_id' => 35, 'description' => 'Create digital artwork from scratch'],

            ['course_id' => 36, 'description' => 'Learn vector design fundamentals'],
            ['course_id' => 36, 'description' => 'Understand Illustrator tools and shapes'],
            ['course_id' => 36, 'description' => 'Create simple vector graphics'],

            ['course_id' => 37, 'description' => 'Learn the principles of logo design'],
            ['course_id' => 37, 'description' => 'Create vector-based logos'],
            ['course_id' => 37, 'description' => 'Understand branding considerations in logo creation'],

            ['course_id' => 38, 'description' => 'Learn drawing techniques using vector tools'],
            ['course_id' => 38, 'description' => 'Understand shading and color in digital illustration'],
            ['course_id' => 38, 'description' => 'Create complete vector illustrations'],

            ['course_id' => 39, 'description' => 'Design vector posters'],
            ['course_id' => 39, 'description' => 'Use layout and grids effectively'],
            ['course_id' => 39, 'description' => 'Apply typography principles to posters'],

            ['course_id' => 40, 'description' => 'Master blend, mesh, and advanced tools'],
            ['course_id' => 40, 'description' => 'Create complex vector artwork'],
            ['course_id' => 40, 'description' => 'Work on professional illustration techniques'],

            ['course_id' => 41, 'description' => 'Learn Blender interface and navigation'],
            ['course_id' => 41, 'description' => 'Understand 3D modeling basics'],
            ['course_id' => 41, 'description' => 'Render simple 3D scenes'],

            ['course_id' => 42, 'description' => 'Learn keyframe and timeline animation'],
            ['course_id' => 42, 'description' => 'Animate simple 3D objects and characters'],
            ['course_id' => 42, 'description' => 'Understand animation workflows in Blender'],

            ['course_id' => 43, 'description' => 'Learn digital sculpting techniques'],
            ['course_id' => 43, 'description' => 'Create high-detail character sculpts'],
            ['course_id' => 43, 'description' => 'Understand sculpting workflows and tools'],

            ['course_id' => 44, 'description' => 'Learn VFX compositing in Blender'],
            ['course_id' => 44, 'description' => 'Create simple visual effects shots'],
            ['course_id' => 44, 'description' => 'Understand basic tracking and simulation'],

            ['course_id' => 45, 'description' => 'Learn low-poly modeling techniques'],
            ['course_id' => 45, 'description' => 'Create assets optimized for game engines'],
            ['course_id' => 45, 'description' => 'Understand UV mapping and texturing'],

            ['course_id' => 46, 'description' => 'Understand color psychology'],
            ['course_id' => 46, 'description' => 'Learn basic color harmony principles'],
            ['course_id' => 46, 'description' => 'Apply color theory in design projects'],

            ['course_id' => 47, 'description' => 'Learn color correction fundamentals'],
            ['course_id' => 47, 'description' => 'Perform photo color grading techniques'],
            ['course_id' => 47, 'description' => 'Understand LUTs and tone manipulation'],

            ['course_id' => 48, 'description' => 'Learn artistic color composition'],
            ['course_id' => 48, 'description' => 'Apply color in digital and traditional art'],
            ['course_id' => 48, 'description' => 'Create balanced color palettes'],

            ['course_id' => 49, 'description' => 'Understand color use in branding'],
            ['course_id' => 49, 'description' => 'Learn color psychology in marketing'],
            ['course_id' => 49, 'description' => 'Build brand-consistent color palettes'],

            ['course_id' => 50, 'description' => 'Explore advanced color theories'],
            ['course_id' => 50, 'description' => 'Learn color-driven UX and marketing strategies'],
            ['course_id' => 50, 'description' => 'Apply color psychology in design'],

            ['course_id' => 51, 'description' => 'Learn basic Figma interface and tools'],
            ['course_id' => 51, 'description' => 'Design simple user interfaces'],
            ['course_id' => 51, 'description' => 'Create UI components and layouts'],

            ['course_id' => 52, 'description' => 'Learn to create interactive prototypes'],
            ['course_id' => 52, 'description' => 'Understand transitions and flows'],
            ['course_id' => 52, 'description' => 'Build clickable app prototypes'],

            ['course_id' => 53, 'description' => 'Understand scalable UI design systems'],
            ['course_id' => 53, 'description' => 'Create reusable components and tokens'],
            ['course_id' => 53, 'description' => 'Document design systems effectively'],

            ['course_id' => 54, 'description' => 'Learn mobile design principles'],
            ['course_id' => 54, 'description' => 'Design responsive mobile screens'],
            ['course_id' => 54, 'description' => 'Create UI kits for mobile apps'],

            ['course_id' => 55, 'description' => 'Master auto-layout and advanced components'],
            ['course_id' => 55, 'description' => 'Learn to animate UI with Figma'],
            ['course_id' => 55, 'description' => 'Build complex design system components'],
        ];

        foreach ($courseStudentBenefits as $courseStudentBenefit) {
            CourseStudentBenefit::firstOrCreate($courseStudentBenefit);
        }
    }
}
