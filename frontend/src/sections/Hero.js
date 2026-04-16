import React from 'react';
import { Link } from 'react-scroll';
import TranslatableText from '../components/TranslatableText';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <div className={styles.content}>
            <TranslatableText
              text="Know Your Rights, Secure Your Future"
              component="h1"
              className={styles.title}
            />
            <TranslatableText
              text="Accessible legal information for every Indian citizen in your preferred language."
              component="p"
              className={styles.subtitle}
            />
            <Link
              to="know-your-rights"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className={styles.exploreButton}
            >
              <TranslatableText text="Explore Rights" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
