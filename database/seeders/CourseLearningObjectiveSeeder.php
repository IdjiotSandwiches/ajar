<?php

namespace Database\Seeders;

use App\Models\CourseLearningObjective;
use Illuminate\Database\Seeder;

class CourseLearningObjectiveSeeder extends Seeder
{
    public function run(): void
    {
        $objectives = [
            ['course_id' => 1, 'description' => 'Understand basic concepts of artificial intelligence and intelligent agents.'],
            ['course_id' => 1, 'description' => 'Learn search algorithms including BFS, DFS, and informed search.'],
            ['course_id' => 1, 'description' => 'Apply logical reasoning and problem-solving techniques in AI.'],

            ['course_id' => 2, 'description' => 'Understand supervised and unsupervised learning concepts.'],
            ['course_id' => 2, 'description' => 'Learn how to train basic ML models such as regression and classification.'],
            ['course_id' => 2, 'description' => 'Evaluate model performance using accuracy, precision, and recall.'],

            ['course_id' => 3, 'description' => 'Understand neural network architecture and activation functions.'],
            ['course_id' => 3, 'description' => 'Learn how backpropagation and gradient descent work.'],
            ['course_id' => 3, 'description' => 'Build simple deep learning models using modern frameworks.'],

            ['course_id' => 4, 'description' => 'Identify AI use cases in business operations and automation.'],
            ['course_id' => 4, 'description' => 'Understand how AI supports business analytics and decision making.'],
            ['course_id' => 4, 'description' => 'Learn how to evaluate the impact of AI in business processes.'],

            ['course_id' => 5, 'description' => 'Understand how large language models process instructions.'],
            ['course_id' => 5, 'description' => 'Learn effective prompting strategies to produce accurate responses.'],
            ['course_id' => 5, 'description' => 'Apply prompt templates for writing, coding, and automation tasks.'],

            ['course_id' => 6, 'description' => 'Understand basic networking concepts including IP addressing.'],
            ['course_id' => 6, 'description' => 'Learn routing and switching principles.'],
            ['course_id' => 6, 'description' => 'Configure simple network topologies and troubleshoot them.'],

            ['course_id' => 7, 'description' => 'Understand CCNA exam objectives and core networking topics.'],
            ['course_id' => 7, 'description' => 'Practice routing and switching configurations hands-on.'],
            ['course_id' => 7, 'description' => 'Troubleshoot network issues using Cisco tools.'],

            ['course_id' => 8, 'description' => 'Learn fundamental network security concepts.'],
            ['course_id' => 8, 'description' => 'Configure basic firewall and VPN settings.'],
            ['course_id' => 8, 'description' => 'Understand how to secure network architectures from threats.'],

            ['course_id' => 9, 'description' => 'Understand wireless networking standards and architectures.'],
            ['course_id' => 9, 'description' => 'Learn techniques to optimize WiFi networks.'],
            ['course_id' => 9, 'description' => 'Configure basic wireless access points.'],

            ['course_id' => 10, 'description' => 'Diagnose network issues using troubleshooting tools.'],
            ['course_id' => 10, 'description' => 'Analyze logs and packet captures to identify problems.'],
            ['course_id' => 10, 'description' => 'Apply structured troubleshooting methodologies.'],

            ['course_id' => 11, 'description' => 'Understand core cybersecurity principles and threats.'],
            ['course_id' => 11, 'description' => 'Learn how malware, phishing, and attacks operate.'],
            ['course_id' => 11, 'description' => 'Apply basic defensive security techniques.'],

            ['course_id' => 12, 'description' => 'Understand penetration testing lifecycle and methodology.'],
            ['course_id' => 12, 'description' => 'Learn common ethical hacking tools and techniques.'],
            ['course_id' => 12, 'description' => 'Perform simple vulnerability scans responsibly.'],

            ['course_id' => 13, 'description' => 'Understand digital forensics concepts and evidence handling.'],
            ['course_id' => 13, 'description' => 'Learn how to extract and analyze digital evidence.'],
            ['course_id' => 13, 'description' => 'Apply forensic methodologies to real scenarios.'],

            ['course_id' => 14, 'description' => 'Understand cloud security risks and best practices.'],
            ['course_id' => 14, 'description' => 'Learn identity and access management in cloud environments.'],
            ['course_id' => 14, 'description' => 'Apply cloud security controls to protect infrastructure.'],

            ['course_id' => 15, 'description' => 'Understand threat intelligence lifecycle.'],
            ['course_id' => 15, 'description' => 'Analyze threat reports and indicators of compromise.'],
            ['course_id' => 15, 'description' => 'Use threat intelligence for better security decisions.'],

            ['course_id' => 16, 'description' => 'Understand cloud computing models (IaaS, PaaS, SaaS).'],
            ['course_id' => 16, 'description' => 'Learn cloud architecture principles.'],
            ['course_id' => 16, 'description' => 'Deploy basic cloud services.'],

            ['course_id' => 17, 'description' => 'Understand AWS global infrastructure.'],
            ['course_id' => 17, 'description' => 'Learn core AWS services like EC2, S3, and IAM.'],
            ['course_id' => 17, 'description' => 'Prepare for AWS Solutions Architect exam scenarios.'],

            ['course_id' => 18, 'description' => 'Understand Google Cloud Platform architecture.'],
            ['course_id' => 18, 'description' => 'Use GCP services like Compute Engine and Cloud Storage.'],
            ['course_id' => 18, 'description' => 'Deploy workloads on GCP using best practices.'],

            ['course_id' => 19, 'description' => 'Understand Kubernetes architecture and components.'],
            ['course_id' => 19, 'description' => 'Deploy containerized applications using Kubernetes.'],
            ['course_id' => 19, 'description' => 'Automate deployment pipelines with DevOps tools.'],

            ['course_id' => 20, 'description' => 'Understand infrastructure-as-code concepts.'],
            ['course_id' => 20, 'description' => 'Learn Terraform configuration syntax and modules.'],
            ['course_id' => 20, 'description' => 'Deploy cloud infrastructure using Terraform automation.'],

            ['course_id' => 21, 'description' => 'Learn Python basics for data science.'],
            ['course_id' => 21, 'description' => 'Process and clean data using common libraries.'],
            ['course_id' => 21, 'description' => 'Create visualizations to interpret data.'],

            ['course_id' => 22, 'description' => 'Understand probability and statistical distributions.'],
            ['course_id' => 22, 'description' => 'Perform hypothesis testing and statistical inference.'],
            ['course_id' => 22, 'description' => 'Apply statistics to data science problems.'],

            ['course_id' => 23, 'description' => 'Learn how Tableau works for data visualization.'],
            ['course_id' => 23, 'description' => 'Build interactive dashboards.'],
            ['course_id' => 23, 'description' => 'Interpret data insights using visual analytics.'],

            ['course_id' => 24, 'description' => 'Manipulate data using Python libraries like Pandas.'],
            ['course_id' => 24, 'description' => 'Clean and preprocess datasets effectively.'],
            ['course_id' => 24, 'description' => 'Visualize data using Matplotlib and other tools.'],

            ['course_id' => 25, 'description' => 'Understand intermediate machine learning techniques.'],
            ['course_id' => 25, 'description' => 'Build ML models using scikit-learn.'],
            ['course_id' => 25, 'description' => 'Tune hyperparameters to improve model performance.'],

            ['course_id' => 26, 'description' => 'Learn basic structure of HTML and CSS.'],
            ['course_id' => 26, 'description' => 'Build simple responsive webpages.'],
            ['course_id' => 26, 'description' => 'Understand CSS layout and styling principles.'],

            ['course_id' => 27, 'description' => 'Understand core JavaScript concepts.'],
            ['course_id' => 27, 'description' => 'Manipulate DOM elements using JS.'],
            ['course_id' => 27, 'description' => 'Use modern ES6 features effectively.'],

            ['course_id' => 28, 'description' => 'Learn frontend development workflow.'],
            ['course_id' => 28, 'description' => 'Build applications using React and Tailwind.'],
            ['course_id' => 28, 'description' => 'Deploy frontend applications.'],

            ['course_id' => 29, 'description' => 'Understand Laravel architecture.'],
            ['course_id' => 29, 'description' => 'Build REST APIs using Laravel.'],
            ['course_id' => 29, 'description' => 'Implement authentication and routing.'],

            ['course_id' => 30, 'description' => 'Learn fullstack workflow from backend to frontend.'],
            ['course_id' => 30, 'description' => 'Build fullstack applications with real projects.'],
            ['course_id' => 30, 'description' => 'Deploy fullstack systems end-to-end.'],

            ['course_id' => 31, 'description' => 'Learn Photoshop interface and basic tools.'],
            ['course_id' => 31, 'description' => 'Understand layers and masking.'],
            ['course_id' => 31, 'description' => 'Perform simple editing and corrections.'],

            ['course_id' => 32, 'description' => 'Learn photo blending techniques.'],
            ['course_id' => 32, 'description' => 'Understand retouching principles.'],
            ['course_id' => 32, 'description' => 'Perform detailed manipulation workflows.'],

            ['course_id' => 33, 'description' => 'Understand poster layout fundamentals.'],
            ['course_id' => 33, 'description' => 'Use typography effectively in design.'],
            ['course_id' => 33, 'description' => 'Create attractive poster compositions.'],

            ['course_id' => 34, 'description' => 'Learn professional-level retouch techniques.'],
            ['course_id' => 34, 'description' => 'Master advanced blending and masking.'],
            ['course_id' => 34, 'description' => 'Perform high-end photo editing workflows.'],

            ['course_id' => 35, 'description' => 'Learn digital painting tools and brushes.'],
            ['course_id' => 35, 'description' => 'Create digital art compositions.'],
            ['course_id' => 35, 'description' => 'Build shading and coloring techniques in Photoshop.'],

            ['course_id' => 36, 'description' => 'Learn basic Illustrator tools and vector concepts.'],
            ['course_id' => 36, 'description' => 'Create simple vector illustrations.'],
            ['course_id' => 36, 'description' => 'Understand layers and color usage.'],

            ['course_id' => 37, 'description' => 'Learn logo design principles.'],
            ['course_id' => 37, 'description' => 'Create logos using vector shapes.'],
            ['course_id' => 37, 'description' => 'Apply branding principles in logo design.'],

            ['course_id' => 38, 'description' => 'Use advanced illustration techniques.'],
            ['course_id' => 38, 'description' => 'Understand brushes, gradients, and vector effects.'],
            ['course_id' => 38, 'description' => 'Create professional illustrations.'],

            ['course_id' => 39, 'description' => 'Create poster layouts using vector elements.'],
            ['course_id' => 39, 'description' => 'Apply typography effectively in posters.'],
            ['course_id' => 39, 'description' => 'Build creative vector-based compositions.'],

            ['course_id' => 40, 'description' => 'Use advanced Illustrator tools like mesh and blend.'],
            ['course_id' => 40, 'description' => 'Create complex vector artworks.'],
            ['course_id' => 40, 'description' => 'Master advanced illustration workflows.'],

            ['course_id' => 41, 'description' => 'Understand Blender interface and 3D navigation.'],
            ['course_id' => 41, 'description' => 'Learn basic modeling techniques.'],
            ['course_id' => 41, 'description' => 'Create simple 3D scenes with lighting.'],

            ['course_id' => 42, 'description' => 'Understand animation principles in Blender.'],
            ['course_id' => 42, 'description' => 'Animate 3D objects and characters.'],
            ['course_id' => 42, 'description' => 'Render animated scenes using Blender tools.'],

            ['course_id' => 43, 'description' => 'Learn sculpting tools and workflows in Blender.'],
            ['course_id' => 43, 'description' => 'Create realistic character sculpts.'],
            ['course_id' => 43, 'description' => 'Refine sculpted models using detailing techniques.'],

            ['course_id' => 44, 'description' => 'Understand VFX basics using Blender.'],
            ['course_id' => 44, 'description' => 'Create simple visual effects scenes.'],
            ['course_id' => 44, 'description' => 'Use Blender’s compositor for VFX workflows.'],

            ['course_id' => 45, 'description' => 'Understand low-poly modeling for games.'],
            ['course_id' => 45, 'description' => 'Create optimized 3D assets for game engines.'],
            ['course_id' => 45, 'description' => 'Texture and export game-ready models.'],

            ['course_id' => 46, 'description' => 'Learn basic color theory and color psychology.'],
            ['course_id' => 46, 'description' => 'Apply color harmony in visual compositions.'],
            ['course_id' => 46, 'description' => 'Use color effectively in design.'],

            ['course_id' => 47, 'description' => 'Understand color grading techniques.'],
            ['course_id' => 47, 'description' => 'Apply color tone adjustments to images.'],
            ['course_id' => 47, 'description' => 'Perform cinematic color grading.'],

            ['course_id' => 48, 'description' => 'Apply color compositions in art.'],
            ['course_id' => 48, 'description' => 'Use color to convey emotion in artwork.'],
            ['course_id' => 48, 'description' => 'Build strong visual compositions using color.'],

            ['course_id' => 49, 'description' => 'Use color effectively in branding design.'],
            ['course_id' => 49, 'description' => 'Understand brand color strategy.'],
            ['course_id' => 49, 'description' => 'Build color palettes for brand identity.'],

            ['course_id' => 50, 'description' => 'Understand advanced color psychology concepts.'],
            ['course_id' => 50, 'description' => 'Apply color theories in UX and marketing.'],
            ['course_id' => 50, 'description' => 'Analyze color influence on user perception.'],

            ['course_id' => 51, 'description' => 'Understand Figma interface and basic tools.'],
            ['course_id' => 51, 'description' => 'Create basic UI layouts.'],
            ['course_id' => 51, 'description' => 'Use frames, shapes, and components.'],

            ['course_id' => 52, 'description' => 'Create interactive prototypes using Figma.'],
            ['course_id' => 52, 'description' => 'Build transitions and animations.'],
            ['course_id' => 52, 'description' => 'Simulate app user flows.'],

            ['course_id' => 53, 'description' => 'Understand design system components.'],
            ['course_id' => 53, 'description' => 'Build scalable UI component libraries.'],
            ['course_id' => 53, 'description' => 'Apply design tokens and styling rules.'],

            ['course_id' => 54, 'description' => 'Create mobile UI layouts in Figma.'],
            ['course_id' => 54, 'description' => 'Apply mobile design principles.'],
            ['course_id' => 54, 'description' => 'Build adaptive and responsive mobile interfaces.'],

            ['course_id' => 55, 'description' => 'Master advanced Figma features like auto-layout.'],
            ['course_id' => 55, 'description' => 'Create animations and micro-interactions.'],
            ['course_id' => 55, 'description' => 'Build professional, scalable UI designs.'],
        ];

        foreach ($objectives as $obj) {
            $obj['course_id'] += 5;
            CourseLearningObjective::create($obj);
        }
    }
}
