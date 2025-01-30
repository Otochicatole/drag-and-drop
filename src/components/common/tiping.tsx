import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const phrases = ['Feliz Aniversario', 'Te Amo Yazmin'];

const TypingHeader = () => {
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loop, setLoop] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const currentIndex = loop % phrases.length;
      const fullText = phrases[currentIndex];

      if (isDeleting) {
        setCurrentPhrase(fullText.substring(0, currentPhrase.length - 1));
        setTypingSpeed(50);
      } else {
        setCurrentPhrase(fullText.substring(0, currentPhrase.length + 1));
        setTypingSpeed(100);
      }

      if (!isDeleting && currentPhrase === fullText) {
        setIsDeleting(true);
        setTypingSpeed(2000);
      } else if (isDeleting && currentPhrase === '') {
        setIsDeleting(false);
        setLoop(loop + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentPhrase, isDeleting, loop, typingSpeed]);

  return (
    <motion.div
      className="flex items-center text-3xl lg:text-6xl transition-all text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-400 font-bold font-sans animate-fade"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span>{currentPhrase}</span>
      <motion.span
        className="text-blue-200 pb-1"
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.5 }}
      >
        |
      </motion.span>
    </motion.div>
  );
};

export default TypingHeader;
