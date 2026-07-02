const fs = require('fs');
const path = require('path');

// Ensure pdfkit is installed
try {
  require.resolve('pdfkit');
} catch (e) {
  console.log('pdfkit not found, installing...');
  const { execSync } = require('child_process');
  execSync('npm install pdfkit', { stdio: 'inherit' });
}

const PDFDocument = require('pdfkit');

function createResume() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: {
      top: 40,
      bottom: 40,
      left: 50,
      right: 50
    }
  });

  const outputPath = path.join(__dirname, 'public', 'resume.pdf');
  const writeStream = fs.createWriteStream(outputPath);
  doc.pipe(writeStream);

  // Palette colors
  const primaryColor = '#4f46e5'; // Indigo
  const secondaryColor = '#1e1b4b'; // Dark Indigo
  const accentColor = '#b45309'; // Gold/Amber
  const textColor = '#374151'; // Dark Grey
  const lightTextColor = '#6b7280'; // Light Grey

  // Header / Title
  doc
    .fillColor(secondaryColor)
    .font('Helvetica-Bold')
    .fontSize(28)
    .text('PRATHAM JADWANI', { align: 'left' });
  
  doc
    .fillColor(primaryColor)
    .font('Helvetica-Bold')
    .fontSize(14)
    .text('Flutter Developer & Creative Web Designer', { align: 'left' })
    .moveDown(0.5);

  // Contact Info
  doc
    .fillColor(textColor)
    .font('Helvetica')
    .fontSize(9)
    .text('Email: prathamjadwani@gmail.com   |   LinkedIn: linkedin.com/in/pratham-jadwani-a5b19225a   |   GitHub: github.com/PRj2903', {
      align: 'left'
    })
    .moveDown(1.5);

  // Horizontal line
  doc
    .moveTo(50, doc.y)
    .lineTo(545, doc.y)
    .strokeColor('#e5e7eb')
    .lineWidth(1)
    .stroke()
    .moveDown(1);

  // 2-Column Layout
  const topY = doc.y;

  // Left Column - Education & Skills
  doc.y = topY;
  
  // Section: Education
  doc
    .fillColor(primaryColor)
    .font('Helvetica-Bold')
    .fontSize(12)
    .text('EDUCATION', 50, doc.y);
  
  doc
    .moveTo(50, doc.y + 2)
    .lineTo(260, doc.y + 2)
    .strokeColor(primaryColor)
    .lineWidth(1)
    .stroke()
    .moveDown(0.6);

  doc
    .fillColor(secondaryColor)
    .font('Helvetica-Bold')
    .fontSize(10)
    .text('BTech in Computer Science', 50, doc.y)
    .font('Helvetica-Oblique')
    .fontSize(9)
    .text('CHARUSAT University | 2023 - Present', 50, doc.y)
    .moveDown(0.5);

  doc
    .fillColor(secondaryColor)
    .font('Helvetica-Bold')
    .fontSize(10)
    .text('Diploma in Computer Engineering', 50, doc.y)
    .font('Helvetica-Oblique')
    .fontSize(9)
    .text('Diploma | CGPA: 8.89 | 2020 - 2023', 50, doc.y)
    .moveDown(1.5);

  // Section: Technical Skills
  doc
    .fillColor(primaryColor)
    .font('Helvetica-Bold')
    .fontSize(12)
    .text('TECHNICAL SKILLS', 50, doc.y);

  doc
    .moveTo(50, doc.y + 2)
    .lineTo(260, doc.y + 2)
    .strokeColor(primaryColor)
    .lineWidth(1)
    .stroke()
    .moveDown(0.6);

  const skills = [
    { category: 'Languages', items: 'C++, Java, SQL, Dart' },
    { category: 'Frameworks', items: 'Flutter, React.js, Spring Boot' },
    { category: 'Database & Cloud', items: 'Firebase, MySQL, SQLite' },
    { category: 'Tools', items: 'VS Code, IntelliJ, Git, GitHub' }
  ];

  skills.forEach(skill => {
    doc
      .fillColor(secondaryColor)
      .font('Helvetica-Bold')
      .fontSize(9)
      .text(skill.category + ':', 50, doc.y)
      .fillColor(textColor)
      .font('Helvetica')
      .text(skill.items, 50, doc.y)
      .moveDown(0.4);
  });

  // Right Column - Projects & Experience
  doc.y = topY;

  // Section: Client Projects (Live Work)
  doc
    .fillColor(primaryColor)
    .font('Helvetica-Bold')
    .fontSize(12)
    .text('FEATURED CLIENT PROJECTS', 290, doc.y);

  doc
    .moveTo(290, doc.y + 2)
    .lineTo(545, doc.y + 2)
    .strokeColor(primaryColor)
    .lineWidth(1)
    .stroke()
    .moveDown(0.6);

  doc
    .fillColor(secondaryColor)
    .font('Helvetica-Bold')
    .fontSize(10)
    .text('Wings Design - Interior Design Website', 290, doc.y)
    .fillColor(textColor)
    .font('Helvetica')
    .fontSize(8.5)
    .text('• Developed an elegant, luxury-themed portfolio site for a major interior design group.', 290, doc.y)
    .text('• Implemented fluid custom transitions and animations to showcase luxury interiors.', 290, doc.y)
    .fillColor(lightTextColor)
    .text('Tech: React, Vite, Framer Motion, Vanilla CSS', 290, doc.y)
    .moveDown(0.6);

  doc
    .fillColor(secondaryColor)
    .font('Helvetica-Bold')
    .fontSize(10)
    .text('Dada Design Studio - Architecture Website', 290, doc.y)
    .fillColor(textColor)
    .font('Helvetica')
    .fontSize(8.5)
    .text('• Engineered a premium minimalist architecture portfolio showcasing large-scale construction.', 290, doc.y)
    .text('• Optimized asset rendering for high-resolution project designs.', 290, doc.y)
    .fillColor(lightTextColor)
    .text('Tech: React, CSS Modules, GSAP Animations', 290, doc.y)
    .moveDown(1.5);

  // Section: App Development Projects
  doc
    .fillColor(primaryColor)
    .font('Helvetica-Bold')
    .fontSize(12)
    .text('MOBILE APP PROJECTS', 290, doc.y);

  doc
    .moveTo(290, doc.y + 2)
    .lineTo(545, doc.y + 2)
    .strokeColor(primaryColor)
    .lineWidth(1)
    .stroke()
    .moveDown(0.6);

  const appProjects = [
    {
      name: 'StudyMate App',
      desc: 'An education companion app to coordinate classes, study notes, and task lists.',
      tech: 'Flutter, Spring Boot, REST APIs'
    },
    {
      name: 'Ptunes Music Player',
      desc: 'A gorgeous local audio player featuring native background-play service and local caching.',
      tech: 'Flutter, Audio Service, Hive DB'
    },
    {
      name: 'Flashcard Learning App',
      desc: 'Interactive flashcards with spaced repetition algorithm and cloud database sync.',
      tech: 'Flutter, Firebase, Cloud Firestore'
    }
  ];

  appProjects.forEach(project => {
    doc
      .fillColor(secondaryColor)
      .font('Helvetica-Bold')
      .fontSize(10)
      .text(project.name, 290, doc.y)
      .fillColor(textColor)
      .font('Helvetica')
      .fontSize(8.5)
      .text(`• ${project.desc}`, 290, doc.y)
      .fillColor(lightTextColor)
      .text(`Tech: ${project.tech}`, 290, doc.y)
      .moveDown(0.5);
  });

  doc.end();

  writeStream.on('finish', () => {
    console.log('Resume PDF generated successfully at public/resume.pdf!');
  });
}

createResume();
