import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function CoverPage() {
  return (
    <div className="cover-screen-fixed">
      <motion.section
        className="cover-book-fixed"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="cover-bg-fixed" />
        <div className="cover-dark-fixed" />
        <div className="cover-shine-fixed" />
        <div className="cover-particles-fixed" />

        <motion.div
          className="cover-content-fixed"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.65 }}
        >
          <div className="cover-badge-fixed">
            <Sparkles size={16} />
            Álbum digital
          </div>

          <motion.h1
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Olavarría
            <span>en Figuritas</span>
          </motion.h1>

          <p>El álbum digital de la ciudad</p>
          <strong>Cada rincón guarda una figurita.</strong>

          <Link to="/album" className="cover-start-fixed">
            <BookOpen size={20} />
            Comenzar
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
}
