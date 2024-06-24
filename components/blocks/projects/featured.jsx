import Image from "next/image";

import { useEffect } from "react";
import { m, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Badges from "../../utils/badge.list.util";
import Icon from "../../utils/icon.util";

import css from "../../../styles/sections/projects/featured.module.scss";
import content from "../../../content/projects/featured.json";

export default function FeaturedProject({ content }, index) {
  const {
    project,
    url,
    repo,
    descriptionTitle,
    description,
    stack,
    imageOptions,
    appstoreBadgeUrl,
    googleBadgeUrl,
    appstoreUrl,
    googleUrl,
    images,
  } = content;

  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    if (!inView) {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <m.section
      key={index}
      className={css.project}
      //framer-motion
      ref={ref}
      variants={container}
      initial={["rest", "hidden"]}
      whileHover="hover"
      animate={controls}
    >
      <div className={css.details}>
        <div className={css.projectHeader}>
          <div className={css.header}>
            <h3 className="highlight">{project}</h3>
            <span className={css.privateOr}>
              {/* <i className="devicon-chrome-plain"></i> */}
              <a href={url} target="_blank" rel="noreferrer">
                {url}
              </a>
            </span>
          </div>
          <div className={css.description}>
            <p>
              <strong>{descriptionTitle}</strong> {description}
            </p>
          </div>
          <m.div variants={""} className={css.viewProject}>
            <div className="badges-container">
              <a href={googleUrl} target="_blank" rel="noreferrer">
                <Image
                  src={googleBadgeUrl}
                  alt="Google Play Store Badge"
                  width={150}
                  height={40}
                />
              </a>
              <a href={appstoreUrl} target="_blank" rel="noreferrer">
                <Image
                  src={appstoreBadgeUrl}
                  alt="App Store Badge"
                  className="app-badge"
                  width={150}
                  height={40}
                />
              </a>
            </div>
            {/* <Icon icon={["fad", "arrow-right-to-bracket"]} /> */}
          </m.div>
          <div className={css.stackContainer}>
            <Badges
              list={stack}
              block="stack"
              fullContainer={false}
              color={false}
            />
          </div>

          <div className={css.stackContainer}></div>
          <div className={css.stackContainer}></div>

          <style jsx>{`
            .badges-container {
              display: flex;
              flex-direction: row;
              gap: 10px;
            }

            @media (max-width: 768px) {
              .badges-container {
                flex-direction: row;
                justify-content: center;
                display: center;
              }
            }
          `}</style>
        </div>
      </div>

      <div className={css.imageContainer}>
        <span className={`${css.imageAnimationContainer}`}>
          {images.map(({ key, url, hover, h, w }, index) => {
            hover = hover === "left" ? hoverLeft : hoverRight;
            return (
              <m.div key={`${index}-${key}`} variants={item}>
                <m.div variants={hover}>
                  <Image src={url} alt="x" height={h} width={w} />
                </m.div>
              </m.div>
            );
          })}
        </span>
      </div>
    </m.section>
  );
}

const container = {
  hidden: {
    transition: {
      delayChildren: 0.125,
      staggerChildren: 0.0625,
    },
  },
  visible: {
    transition: {
      delayChildren: 0.125,
      staggerChildren: 0.25,
    },
  },
  rest: {
    transition: {
      delayChildren: 0,
      staggerChildren: 0,
    },
  },
  hover: {
    transition: {
      delayChildren: 0,
      staggerChildren: 0,
    },
  },
};

const item = {
  hidden: {
    y: 75,
    opacity: 0,
    transition: {
      type: "tween",
      ease: "easeIn",
      duration: 0.35,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.5,
    },
  },
};

const hoverLeft = {
  rest: {
    x: 0,
  },
  hover: {
    x: -20,
  },
};

const hoverRight = {
  rest: {
    x: 0,
  },
  hover: {
    x: 20,
  },
};
