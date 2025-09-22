'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Trophy, Award, GraduationCap, Briefcase, Mail, Linkedin, Github, Phone, MapPin } from 'lucide-react';
import { PlayerData } from '@/types/player';

interface FIFAPlayerCardProps {
  data: PlayerData;
}

export default function FIFAPlayerCard({ data }: FIFAPlayerCardProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'experience' | 'education' | 'coursework' | 'research' | 'skills' | 'projects' | 'blogs'>('info');


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Office Background with Light Blur */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            filter: "blur(2px) brightness(0.4)"
          }}
        />
        <div className="absolute inset-0 bg-gray-900/30" />
      </div>

              {/* Main Card Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-2 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl mx-auto px-1 sm:px-4 lg:px-8"
        >
                  {/* FIFA Gold Card */}
                  <div className="relative bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 p-1 rounded-2xl shadow-2xl">
                    <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-2xl p-4 sm:p-6 lg:p-8">
              {/* Card Header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8 gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-2xl font-bold text-black border-4 border-amber-300 shadow-lg flex-shrink-0">
                    {data.personalInfo.kitNumber}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wider">
                      {data.personalInfo.name}
                    </h1>
                    <p className="text-lg sm:text-xl text-amber-200 font-semibold">
                      {data.personalInfo.position}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-amber-300">
                      <span>🇮🇳 {data.personalInfo.nationality}</span>
                      <span>📍 {data.contact.location}</span>
                      <span>🎂 {data.personalInfo.age} years</span>
                    </div>
                  </div>
                </div>
                
                {/* Overall Rating */}
                <div className="text-center flex-shrink-0 lg:ml-6 self-center lg:self-start">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-2 border-4 border-amber-300 shadow-lg mx-auto">
                    <span className="text-xl sm:text-2xl font-bold text-black">{data.stats.overall}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-200 font-semibold">OVERALL</p>
                  <p className="text-xs text-amber-300">⭐ GOLD CARD ⭐</p>
                </div>
              </div>

              {/* Player Photo and Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Player Photo */}
                <div className="relative">
                  <div className="relative w-full h-80 sm:h-96 lg:h-[28rem] bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl overflow-hidden border-4 border-amber-400 shadow-lg">
                    {/* Your actual photo */}
                    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
                      {/* Your actual photo */}
                      <div className="w-full h-full bg-cover bg-center bg-no-repeat" 
                           style={{
                             backgroundImage: `url('${data.personalInfo.photo}')`,
                             backgroundPosition: 'center 20%',
                             backgroundSize: 'cover',
                             filter: "grayscale(20%) contrast(1.1)"
                           }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-lg font-bold">MADHUR DIXIT</p>
                        <p className="text-sm opacity-90">Lead AI/ML Infrastructure Engineer</p>
                        <p className="text-xs text-amber-200">⭐ GOLD CARD ⭐</p>
                      </div>
                      </div>
                      
                      {/* Current Experience Badge */}
                      <div className="absolute top-4 right-4 bg-amber-600/90 text-black px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 border-2 border-amber-300 shadow-lg">
                        <span>{data.experiences.find(exp => exp.isCurrent)?.logo}</span>
                        <span>{data.experiences.find(exp => exp.isCurrent)?.name}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Player Stats */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">PLAYER STATS</h3>
                  
                  {Object.entries(data.stats).filter(([key]) => key !== 'overall').map(([stat, value]) => (
                    <div key={stat} className="flex items-center justify-between">
                      <span className="text-amber-200 capitalize font-medium">
                        {stat.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-amber-800 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                        <span className="w-8 text-right font-bold text-white">
                          {value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="nav-tabs flex gap-1 mb-6 bg-slate-800 rounded-lg p-1 border-2 border-amber-400 overflow-x-auto">
                {[
                  { id: 'info', label: 'INFO', icon: Briefcase },
                  { id: 'experience', label: 'EXPERIENCE', icon: Trophy },
                  { id: 'education', label: 'EDUCATION', icon: GraduationCap },
                  { id: 'coursework', label: 'COURSEWORK', icon: Award },
                  { id: 'research', label: 'RESEARCH', icon: Award },
                  { id: 'skills', label: 'SKILLS', icon: Award },
                  { id: 'projects', label: 'PROJECTS', icon: Award },
                  { id: 'blogs', label: 'BLOGS', icon: Award }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id as 'info' | 'experience' | 'education' | 'coursework' | 'research' | 'skills' | 'projects' | 'blogs')}
                            className={`nav-tab flex-shrink-0 flex items-center justify-center gap-1 py-2 px-2 sm:px-3 rounded-md transition-all text-xs whitespace-nowrap ${
                              activeTab === id
                                ? 'bg-amber-500 text-black font-bold border-2 border-amber-300 shadow-lg'
                                : 'text-amber-200 hover:text-white hover:bg-slate-700'
                            }`}
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="font-semibold truncate">{label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[300px]">
                {activeTab === 'info' && (
                  <div className="max-w-4xl mx-auto space-y-6">
                    {/* Professional Summary */}
                    <div className="bg-slate-800 rounded-lg p-6 border-2 border-amber-400">
                      <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-amber-400" />
                        PROFESSIONAL SUMMARY
                      </h4>
                      <p className="text-amber-200 text-sm leading-relaxed">
                        I am a deep-lying playmaker on a tech team. By day, I&apos;m an ML Infra Engineer who orchestrates data pipelines and optimizes workflows, turning complex problems into elegant solutions. 
                        Instead of through-balls, I deliver assists like slashing data retrieval time by 96% and cutting cloud costs by 35%. 
                        When I&apos;m not architecting systems, you can find me analyzing the tactics of a great soccer match, getting lost in a historical documentary, or diving down a YouTube rabbit hole of social experiments and scientific debates. 
                        I thrive on understanding the &ldquo;why&rdquo; behind the &ldquo;what,&rdquo; whether it&apos;s in a CI/CD pipeline or in human behavior.
                      </p>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-slate-800 rounded-lg p-6 border-2 border-amber-400">
                      <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Mail className="w-5 h-5 text-amber-400" />
                        CONTACT INFO
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-amber-200">
                            <Mail className="w-5 h-5" />
                            <a href={`mailto:${data.contact.email}`} className="hover:text-amber-100 transition-colors">
                              {data.contact.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-3 text-amber-200">
                            <Phone className="w-5 h-5" />
                            <a href={`tel:${data.contact.phone}`} className="hover:text-amber-100 transition-colors">
                              {data.contact.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-3 text-amber-200">
                            <MapPin className="w-5 h-5" />
                            <span>{data.contact.location}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-amber-200">
                            <Linkedin className="w-5 h-5" />
                            <a 
                              href={`https://${data.contact.linkedin}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:text-amber-100 transition-colors hover:underline"
                            >
                              {data.contact.linkedin}
                            </a>
                          </div>
                          <div className="flex items-center gap-3 text-amber-200">
                            <Github className="w-5 h-5" />
                            <a 
                              href={`https://${data.contact.github}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:text-amber-100 transition-colors hover:underline"
                            >
                              {data.contact.github}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'experience' && (
                  <div className="space-y-4">
                    {data.experiences.map((experience, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-slate-800 rounded-lg p-4 hover:bg-slate-700 transition-colors border-l-4 ${
                          experience.isCurrent ? 'border-amber-500' : 'border-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-3xl">{experience.logo}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h5 className="text-white font-bold text-lg">
                                {experience.url ? (
                                  <a 
                                    href={experience.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="hover:text-amber-100 transition-colors hover:underline"
                                  >
                                    {experience.name}
                                  </a>
                                ) : (
                                  experience.name
                                )}
                              </h5>
                              {experience.isCurrent && (
                                <span className="bg-amber-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                                  CURRENT
                                </span>
                              )}
                            </div>
                            <p className="text-amber-200">{experience.position}</p>
                            <p className="text-amber-300 text-sm">{experience.duration}</p>
                          </div>
                        </div>
                        <ul className="mt-3 space-y-1">
                          {experience.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="text-amber-200 text-sm flex items-center gap-2">
                              <Trophy className="w-3 h-3 text-amber-300" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === 'education' && (
                  <div className="education-grid grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                    {data.education.map((edu, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-800 rounded-lg p-4 sm:p-6 hover:bg-slate-700 transition-colors w-full min-w-0"
                      >
                        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 w-full">
                          <span className="text-3xl sm:text-4xl flex-shrink-0 self-center sm:self-start">{edu.logo}</span>
                          <div className="flex-1 min-w-0 w-full">
                            <h5 className="text-white font-bold text-lg sm:text-xl break-words leading-tight">{edu.institution}</h5>
                            <p className="text-amber-200 text-sm sm:text-base break-words leading-tight mt-1">{edu.degree}</p>
                            <p className="text-amber-300 text-xs sm:text-sm mt-1">{edu.duration}</p>
                            <p className="text-amber-300 text-xs sm:text-sm">{edu.location}</p>
                            <div className="mt-3">
                              <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-xs sm:text-sm font-bold inline-block">
                                GPA: {edu.gpa}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === 'coursework' && (
                  <div className="space-y-6">
                    {/* Group courses by category */}
                    {['Computer Science', 'Software Engineering', 'Web Technologies', 'Game Development', 'Data Science', 'Data Management', 'AI/ML', 'Networking', 'Systems', 'Security'].map((category, categoryIndex) => {
                      const categoryCourses = data.coursework.filter(course => course.category === category);
                      if (categoryCourses.length === 0) return null;
                      
                      const categoryColors = {
                        'Computer Science': 'border-blue-500 bg-blue-500/10 text-blue-200',
                        'Software Engineering': 'border-green-500 bg-green-500/10 text-green-200',
                        'Web Technologies': 'border-purple-500 bg-purple-500/10 text-purple-200',
                        'Game Development': 'border-pink-500 bg-pink-500/10 text-pink-200',
                        'Data Science': 'border-orange-500 bg-orange-500/10 text-orange-200',
                        'Data Management': 'border-cyan-500 bg-cyan-500/10 text-cyan-200',
                        'AI/ML': 'border-red-500 bg-red-500/10 text-red-200',
                        'Networking': 'border-indigo-500 bg-indigo-500/10 text-indigo-200',
                        'Systems': 'border-yellow-500 bg-yellow-500/10 text-yellow-200',
                        'Security': 'border-rose-500 bg-rose-500/10 text-rose-200'
                      };
                      
                      const colorClass = categoryColors[category as keyof typeof categoryColors] || 'border-gray-500 bg-gray-500/10 text-gray-200';
                      
                      return (
                        <motion.div
                          key={category}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: categoryIndex * 0.1 }}
                          className="space-y-3"
                        >
                          <h4 className="text-lg font-bold text-white flex items-center gap-2">
                            <span className={`w-3 h-3 rounded-full ${colorClass.split(' ')[0].replace('border-', 'bg-')}`}></span>
                            {category}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {categoryCourses.map((course, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
                                className={`bg-slate-800 rounded-lg p-4 hover:bg-slate-700 transition-colors border-l-4 ${colorClass.split(' ')[0]}`}
                              >
                                <div className="space-y-2">
                                  <h5 className="text-white font-bold text-sm">{course.course}</h5>
                                  <p className="text-amber-200 text-xs">{course.institution}</p>
                                  <p className="text-amber-300 text-xs line-clamp-2">{course.description}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {activeTab === 'research' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {data.research.map((research, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-800 rounded-lg p-4 sm:p-6 hover:bg-slate-700 transition-colors border-l-4 border-purple-500"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <h5 className="text-white font-bold text-lg mb-1">{research.title}</h5>
                            <p className="text-amber-200 text-sm mb-2">{research.institution}</p>
                            {research.conferenceId && (
                              <p className="text-amber-300 text-xs mb-2 font-mono">{research.conferenceId}</p>
                            )}
                            <p className="text-amber-300 text-sm mb-3 line-clamp-3">{research.description}</p>
                          </div>
                          <div className="ml-3 flex-shrink-0">
                            <span className="bg-purple-500/20 text-purple-200 px-2 py-1 rounded-full text-xs border border-purple-500/30">
                              {research.focus}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === 'skills' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.skills.map((skillCategory, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-800 rounded-lg p-4 sm:p-6 hover:bg-slate-700 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-2xl">{skillCategory.icon}</span>
                          <h5 className="text-white font-bold text-lg">{skillCategory.category}</h5>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {skillCategory.skills.map((skill, skillIndex) => (
                            <span 
                              key={skillIndex} 
                              className="bg-amber-600/20 text-amber-200 px-3 py-1 rounded-full text-sm border border-amber-500/30 hover:bg-amber-600/30 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === 'projects' && (
                  <div className="space-y-6">
                    {/* Group projects by type */}
                    {['Personal Project', 'Portfolio Project', 'Coursework', 'Group Project'].map((projectType, typeIndex) => {
                      const typeProjects = data.projects.filter(project => project.type === projectType);
                      if (typeProjects.length === 0) return null;
                      
                      const typeColors = {
                        'Personal Project': 'border-green-500 bg-green-500/10 text-green-200',
                        'Portfolio Project': 'border-purple-500 bg-purple-500/10 text-purple-200',
                        'Coursework': 'border-blue-500 bg-blue-500/10 text-blue-200',
                        'Group Project': 'border-orange-500 bg-orange-500/10 text-orange-200'
                      };
                      
                      const colorClass = typeColors[projectType as keyof typeof typeColors] || 'border-gray-500 bg-gray-500/10 text-gray-200';
                      
                      return (
                        <motion.div
                          key={projectType}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: typeIndex * 0.1 }}
                          className="space-y-3"
                        >
                          <h4 className="text-lg font-bold text-white flex items-center gap-2">
                            <span className={`w-3 h-3 rounded-full ${colorClass.split(' ')[0].replace('border-', 'bg-')}`}></span>
                            {projectType}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {typeProjects.map((project, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (typeIndex * 0.1) + (index * 0.05) }}
                                className={`bg-slate-800 rounded-lg p-4 hover:bg-slate-700 transition-colors border-l-4 ${colorClass.split(' ')[0]}`}
                              >
                                <div className="space-y-3">
                                  <div className="flex items-start justify-between gap-2">
                                    <h5 className="text-white font-bold text-sm flex-1 min-w-0">
                                      {project.url ? (
                                        <a 
                                          href={project.url} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="hover:text-amber-100 transition-colors hover:underline"
                                        >
                                          {project.name}
                                        </a>
                                      ) : (
                                        project.name
                                      )}
                                    </h5>
                                    <span className="text-amber-300 text-xs flex-shrink-0">{project.year}</span>
                                  </div>
                                  <p className="text-amber-200 text-xs line-clamp-2">{project.description}</p>
                                  <div className="flex flex-wrap gap-1">
                                    {project.technologies.map((tech, techIndex) => (
                                      <span key={techIndex} className="bg-slate-700 text-amber-200 px-2 py-1 rounded text-xs">
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {activeTab === 'blogs' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {data.blogs.map((blog, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-800 rounded-lg p-4 sm:p-6 hover:bg-slate-700 transition-colors border-l-4 border-blue-500"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <h5 className="text-white font-bold text-lg mb-2 line-clamp-2">{blog.title}</h5>
                            <p className="text-amber-200 text-sm mb-3 line-clamp-3">{blog.description}</p>
                          </div>
                          <div className="ml-3 flex-shrink-0">
                            <span className="bg-blue-500/20 text-blue-200 px-2 py-1 rounded-full text-xs border border-blue-500/30">
                              {blog.platform}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-3 text-xs text-amber-300">
                          <span>{blog.date}</span>
                          <span>{blog.readTime}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {blog.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="bg-slate-700 text-amber-200 px-2 py-1 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <a 
                          href={blog.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-black font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
                        >
                          <span>Read Article</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
