'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import data from "@/data/recommendations.json"
import { Recommendation } from '@/types/notion';
const limit=600
const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut'
      }
    })
  };
  
  const truncateText = (text, limit = 600) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + '...';
  };
  
  const RecommendationCard = ({ rec, index }) => {
    const [expanded, setExpanded] = useState(false);
  
    const toggleExpanded = () => setExpanded(!expanded);
  
    return (
      <motion.div
        key={index}
        className="flex flex-col justify-between bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow hover:shadow-md transition"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={index}
        variants={cardVariants}
      >
        <div>
          <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-line">
            {expanded ? rec.text : truncateText(rec.text)}
            {rec.text.length > limit && (
              <button
                onClick={toggleExpanded}
                className="text-blue-500 hover:underline ml-2"
              >
                {expanded ? 'See less' : 'See more...'}
              </button>
            )}
          </p>
        </div>
  
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <p className="text-gray-900 dark:text-white font-semibold">{rec.name}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{rec.jobTitle}</p>
          <p className="text-gray-500 dark:text-gray-500 text-sm">{rec.company}</p>
          <p className="text-gray-400 text-xs mt-1">
            {new Date(rec.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </motion.div>
    );
  };
  
  const RecommendationSection = ({recommendations}: {recommendations: Recommendation[]}) => {
    return (
      <section className="bg-white dark:bg-gray-900 py-12 px-4 md:px-8" id="recommendations">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-800 dark:text-white mb-8 "
          >
            Recommendations
          </motion.h2>
  
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 auto-rows-fr">
            {recommendations.map((rec, index) => (
              <RecommendationCard key={index} rec={rec} index={index} />
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default RecommendationSection;