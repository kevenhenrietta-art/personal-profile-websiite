"use client";

import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, ChevronDown, ChevronUp, Download, Mail, Phone } from 'lucide-react';

const navItems = [
  { label: '代表项目', href: '#projects' },
  { label: '职业经历', href: '#career' },
  { label: '学习与实践', href: '#learning' },
  { label: '长期积累', href: '#growth' },
];

const capabilityTags = [
  '8 年互联网产品经验',
  '医疗健康 / 消费医疗',
  'AI 产品落地',
  '平台化能力建设',
  '复杂业务系统',
  'Vibe Coding 实践',
];

const HERO_TYPE_INTERVAL_MS = 28;

export default function Hero() {
  const [contactOpen, setContactOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [typedLine1Count, setTypedLine1Count] = useState(0);
  const [typedLine2Count, setTypedLine2Count] = useState(0);
  const [showBullets, setShowBullets] = useState(false);

  const heroTypedLine1 = useMemo(
    () => '嗨，你好呀，我是兼具产品平台能力、业务增长与大模型场景能力落地的 AI 产品经理',
    []
  );

  const heroTypedLine2 = useMemo(() => 'Nice to meet you，我有', []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedLine1Count(heroTypedLine1.length);
      setTypedLine2Count(heroTypedLine2.length);
      setShowBullets(true);
      return;
    }

    setTypedLine1Count(0);
    setTypedLine2Count(0);
    setShowBullets(false);

    const interval = window.setInterval(() => {
      setTypedLine1Count((prev) => {
        if (prev >= heroTypedLine1.length) return prev;
        return prev + 1;
      });
    }, HERO_TYPE_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, heroTypedLine1, heroTypedLine2]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (typedLine1Count < heroTypedLine1.length) return;

    const timeout = window.setTimeout(() => {
      const interval = window.setInterval(() => {
        setTypedLine2Count((prev) => {
          if (prev >= heroTypedLine2.length) return prev;
          return prev + 1;
        });
      }, HERO_TYPE_INTERVAL_MS);

      return () => window.clearInterval(interval);
    }, 220);

    return () => window.clearTimeout(timeout);
  }, [prefersReducedMotion, typedLine1Count, heroTypedLine1.length, heroTypedLine2.length, heroTypedLine2]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (typedLine2Count < heroTypedLine2.length) return;
    const timeout = window.setTimeout(() => setShowBullets(true), 180);
    return () => window.clearTimeout(timeout);
  }, [prefersReducedMotion, typedLine2Count, heroTypedLine2.length]);

  const fadeUpOnce = (delay = 0, duration = 0.85) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  });

  const slideInOnce = (delay = 0, duration = 0.55) => ({
    initial: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -16 },
    animate: prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 },
    transition: {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  });

  return (
    <section id="top" className="relative overflow-hidden px-5 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-28 lg:px-10 lg:pb-24 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(56,189,248,0.12),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.08),transparent_32%),linear-gradient(to_bottom,rgba(2,6,23,0.98),rgba(2,6,23,1))]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(56,189,248,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <motion.div className="w-full max-w-5xl" {...fadeUpOnce(0.15, 0.9)}>
            <h1 className="mx-auto flex max-w-[980px] flex-col items-center text-center font-medium tracking-[-0.025em] text-white">
              <span className="mt-2 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-[18px] leading-[1.3] text-white/88 sm:text-[20px] md:text-[22px] lg:text-[24px]">
                <motion.span
                  aria-hidden
                  className="inline-flex origin-[70%_70%] text-[20px] sm:text-[22px] md:text-[24px]"
                  initial={{ rotate: 0 }}
                  animate={
                    prefersReducedMotion ? { rotate: 0 } : { rotate: [0, 18, -10, 18, 0] }
                  }
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 1.1, ease: "easeInOut", repeat: 2, repeatDelay: 0.6 }
                  }
                >
                  👋
                </motion.span>
                <span className="relative inline-block text-left">
                  <span className="invisible">{heroTypedLine1}</span>
                  <span className="absolute left-0 top-0">
                    {heroTypedLine1.slice(0, typedLine1Count)}
                  </span>
                </span>
              </span>
              <span className="mt-2 text-[15px] leading-7 text-white/70 sm:text-base">
                <span className="relative inline-block text-left">
                  <span className="invisible">{heroTypedLine2}</span>
                  <span className="absolute left-0 top-0">
                    {heroTypedLine2.slice(0, typedLine2Count)}
                  </span>
                </span>
              </span>
            </h1>
          </motion.div>

          <motion.div className="mt-6 w-full max-w-[860px]">
            <div className="mx-auto max-w-[760px] text-left">
              <div className="space-y-4">
                {
                  [
                    "8年互联网产品经验，聚焦医疗健康、消费医疗与平台化建设",
                    "主导多个 AI 产品和复杂业务系统从 0 到 1 到多落地，持续推动产品落地、效率提升与商业收入增长",
                    "具备复杂业务抽象、模型协同、跨团队推进与结果闭环能力",
                    "关注 AI 能力在真实业务场景中的产品化落地与长期价值",
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      {...(showBullets ? slideInOnce(index * 0.12, 0.6) : { initial: { opacity: 0 } })}
                      className="flex items-start gap-3"
                    >
                      <Check className="mt-[3px] h-4 w-4 shrink-0 text-cyan-300/80" />
                      <p className="text-[14px] leading-7 text-white/74 sm:text-[15px] md:text-base">
                        {item}
                      </p>
                    </motion.div>
                  ))
                }
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-7 flex max-w-[920px] flex-wrap items-center justify-center gap-3"
            {...fadeUpOnce(1.35, 0.9)}
          >
            {capabilityTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/[0.035] px-4 py-1.5 text-[13px] font-normal text-white/60 backdrop-blur-sm transition hover:text-white/80"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div className="mt-9 grid w-full max-w-6xl gap-4 lg:grid-cols-[1fr_300px]">
            <div className="hidden lg:block rounded-[26px] bg-white/[0.04] px-4 py-4 backdrop-blur-xl sm:px-5 sm:py-5">
              <motion.p
                {...fadeUpOnce(1.65, 0.85)}
                className="text-left text-xs tracking-[0.18em] text-white/35"
              >
                页面导航
              </motion.p>

              <motion.div
                className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4"
                {...fadeUpOnce(1.8, 0.95)}
              >
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group relative flex items-center justify-between rounded-full bg-white/[0.10] px-4 py-3 text-sm text-white/90 backdrop-blur-md transition hover:bg-white/[0.16]"
                  >
                    <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_40%)] opacity-70" />
                    <span className="relative z-10">{item.label}</span>
                    <ArrowRight className="relative z-10 h-4 w-4 text-cyan-300/90 transition-transform group-hover:translate-x-1" />
                  </a>
                ))}
              </motion.div>
            </div>

            <div className="rounded-[26px] bg-white/[0.03] px-4 py-4 backdrop-blur-xl sm:px-5 sm:py-5">
              <motion.p
                {...fadeUpOnce(2.0, 0.85)}
                className="text-left text-xs tracking-[0.18em] text-white/30"
              >
                快捷操作
              </motion.p>

              <motion.div
                className="mt-3"
                {...fadeUpOnce(2.15, 0.95)}
              >
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="/files/resume.pdf"
                    download
                    className="flex items-center justify-between rounded-full bg-white/[0.10] px-4 py-3 text-sm text-white/80 backdrop-blur-md transition hover:bg-white/[0.16]"
                  >
                    <span>下载简历</span>
                    <Download className="h-4 w-4 text-cyan-300/80" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setContactOpen((v) => !v)}
                    className="flex w-full items-center justify-between rounded-full bg-white/[0.08] px-4 py-3 text-sm text-white/72 backdrop-blur-md transition hover:bg-white/[0.14]"
                  >
                    <span>联系方式</span>
                    {contactOpen ? (
                      <ChevronUp className="h-4 w-4 text-white/50" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-white/50" />
                    )}
                  </button>
                </div>

                {contactOpen && (
                  <div className="mt-3 rounded-[20px] bg-white/[0.04] px-4 py-4 text-left backdrop-blur-md">
                    <div className="flex gap-3">
                      <Phone className="mt-0.5 h-4 w-4 text-cyan-300/80" />
                      <div>
                        <p className="text-xs text-white/40">手机</p>
                        <p className="text-sm text-white/80">15026510174</p>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <Mail className="mt-0.5 h-4 w-4 text-cyan-300/80" />
                      <div>
                        <p className="text-xs text-white/40">邮箱</p>
                        <p className="text-sm text-white/80 break-all">15026510174@163.com</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
