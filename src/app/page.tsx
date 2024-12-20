"use client"
import Image from "next/image";
import Plant from "@/assets/svg/Planta_hero.svg"
import Tulipan from "@/assets/svg/TulipaScrool.svg"
import imgSection2 from "@/assets/img/ImgSection2.png"
import imgSection4 from "@/assets/img/ImgSection4.png"
import { motion, useInView, useMotionValueEvent, useScroll, useTransform } from "motion/react"
import { cn } from "@/lib/utils";
import { Children, isValidElement, useRef } from "react";



export default function Home() {
  const { scrollY } = useScroll();
  const yMovementPlant = useTransform(scrollY, [0, 158], ['0rem', '-10rem']);
  const yMovementHero = useTransform(scrollY, [0, 500], ['0rem', '-10rem']);

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Page scroll: ", latest)
  })


  function WordsPullUp({
    text,
    className = '',
  }: {
    text: string;
    className?: string;
  }) {
    const splittedText = text.split(' ');

    const pullupVariant = {
      initial: { y: 20, opacity: 0 },
      animate: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: {
          delay: i * 0.1,
        },
      }),
    };
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
      <div className="flex justify-center">
        {splittedText.map((current, i) => (
          <motion.div
            key={i}
            ref={ref}
            variants={pullupVariant}
            initial="initial"
            animate={isInView ? 'animate' : ''}
            custom={i}
            className={cn(
              '',
              'pr-2', // class to sperate words
              className
            )}
          >
            {current == '' ? <span>&nbsp;</span> : current}
          </motion.div>
        ))}
      </div>
    );
  }


  function Fade({
    direction,
    children,
    className = '',
    staggerChildren = 0.1,
  }: {
    direction: 'up' | 'down';
    children: React.ReactNode;
    className?: string;
    staggerChildren?: number;
  }) {
    const FADE_DOWN = {
      show: { opacity: 1, y: 0, transition: { type: 'spring' } },
      hidden: { opacity: 0, y: direction === 'down' ? -18 : 18 },
    };
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'show' : ''}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: staggerChildren,
            },
          },
        }}
        className={className}
      >
        {Children.map(children, (child) =>
          isValidElement(child) ? (
            <motion.div variants={FADE_DOWN}>{child}</motion.div>
          ) : (
            child
          )
        )}
      </motion.div>
    );
  }

  function FadeOpacity({
    children,
    className = '',
    staggerChildren = 0.1,
  }: {
    children: React.ReactNode;
    className?: string;
    staggerChildren?: number;
  }) {
    const FADE_DOWN = {
      show: {
        opacity: 1, transition: {
          delay: 0.5,
        },
      },
      hidden: {
        opacity: 0, transition: {
          delay: 0.4,
        },
      },
    };
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'show' : ''}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: staggerChildren,
            },
          },
        }}
        className={className}
      >
        {Children.map(children, (child) =>
          isValidElement(child) ? (
            <motion.div variants={FADE_DOWN}>{child}</motion.div>
          ) : (
            child
          )
        )}
      </motion.div>
    );
  }

  return (
    <main>
      <section className="bg_papel min-h-screen flex items-center justify-center text-white flex-col relative overflow-hidden">
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0,
            duration: 0.5,
            ease: "easeOut",
          }}
          style={{ y: yMovementPlant }}
          className="absolute -right-40 -top-20"
        >
          <Image src={Plant} alt="Planta de inicio" />
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0,
            duration: 0.5,
            ease: "easeOut",
          }}
          style={{ y: yMovementPlant }}
          className="absolute -left-40 -top-20"
        >
          <Image src={Plant} alt="Planta de inicio" className="rotate-90" />
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            translateY: 10
          }}
          animate={{
            opacity: 1,
            translateY: 0
          }}
          transition={{
            delay: 0,
            duration: 0.5,
            ease: "easeOut",
          }}
          className="gap-1 flex flex-col items-center absolute bottom-0">
          <span className="uppercase font-light">Seguir bajando</span>
          <Image src={Tulipan} alt="Planta de inicio" />
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            translateY: -10
          }}
          animate={{
            opacity: 1,
            translateY: 0
          }}
          transition={{
            delay: 0,
            duration: 0.5,
            ease: "easeOut",
          }}
          style={{ y: yMovementHero }}
        >
          <h1 className="flex flex-col items-center">
            <span className="font-aston text-[90px]">Transforma</span>
            <WordsPullUp text="Tu guardarropa" className="font-black text-[60px] uppercase mt-[-1rem]" />
            {/* <span className="font-black text-[60px] uppercase mt-[-1.5rem]">Tu guardarropa</span> */}
          </h1>
          <p className="text-[28px] mt-[-0.4rem] font-light uppercase">Dale una segunda vida a tus prendas favoritas</p>
        </motion.div>
      </section>
      <section className="flex items-center justify-center text-[#343E32]">
        <div className="flex items-center justify-evenly my-16 container mx-auto">
          <div>
            <Fade direction="down" className="">
              <span className="font-aston text-[42px]">El guardarropa</span>
            </Fade>
            <div className="w-[35rem] flex flex-wrap">
              <WordsPullUp text="no tiene que ser un lugar" className="font-black uppercase text-[38px] leading-9" />
              <WordsPullUp text="de desechos" className="font-black uppercase text-[38px] leading-9" />
            </div>
            {/* <h2 className="font-black uppercase text-[38px] w-[35rem] leading-9">no tiene que ser un lugar de desechos</h2> */}
            <FadeOpacity>
              <p className="text-[20px] w-[47rem] mt-3">Cada año, millones de prendas terminan acumulándose en los armarios o en vertederos, mientras seguimos comprando ropa que no usamos porque no combina o simplemente no nos representa. En Be-tty queremos cambiar eso, ayudándote a dar un nuevo propósito a tu ropa y a hacer compras más conscientes y útiles.</p>
            </FadeOpacity>
          </div>
          <FadeOpacity>
            <Image src={imgSection2} className="w-[30rem]" alt="Image de no tiene que ser un lugar de desechos" />
          </FadeOpacity>
        </div>
      </section>
      <section className="text-[#343E32] h-[40rem] flex items-center justify-center">
        <div className="flex items-center justify-center gap-20 flex-col">
          <motion.div
            initial={{
              opacity: 0,
              translateY: 0
            }}
            animate={{
              opacity: 1,
              translateY: 0
            }}
            transition={{
              delay: 0,
              duration: 0.5,
              ease: "easeOut",
            }}
            style={{ y: useTransform(scrollY, [1134, 2089], ['0rem', '-8rem']) }}
          >
            <div className="w-[max-content]">
              <div className="flex items-end gap-4 justify-center">
                <h2 className="font-black uppercase text-[38px] leading-9">Por qué</h2>
                <span className="font-aston text-[42px]">Be-tty</span>
              </div>
              <h2 className="font-black uppercase text-center text-[38px] mt-1 w-[35rem] leading-9">es el aliado perfecto para tu estilo sostenible</h2>
            </div>
          </motion.div>
          <div className="flex items-start gap-24">
            <Fade direction="down">
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-[19px] uppercase font-black">reutilización fácil y Rediseño  </h3>
                <p className="text-[20px] w-[17rem] text-center leading-5"> Transforma prendas que ya tienes en piezas únicas.</p>
              </div>
            </Fade>
            <Fade direction="down">
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-[19px] uppercase font-black">Decisiones inteligentes al comprar</h3>
                <p className="text-[20px] w-[17rem] text-center leading-5">Encuentra ropa que complemente tu guardarropa, evitando errores comunes.</p>
              </div>
            </Fade>
            <Fade direction="down">
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-[19px] uppercase font-black">Sostenibilidad accesible</h3>
                <p className="text-[20px] w-[20rem] text-center leading-5">Reduce el desperdicio y contribuye a un mundo más verde con decisiones responsables.</p>
              </div>
            </Fade>
          </div>
        </div>
      </section>
      <section>
        <div className="w-[83rem] flex items-center mx-auto justify-between h-[30rem]">
          <div className="flex flex-col items-start">
            <WordsPullUp text="Un" className="font-black uppercase text-[38px] leading-9" />
            {/* <h2 className="font-black uppercase text-[38px] leading-9">Un</h2> */}
            <FadeOpacity>
              <span className="font-aston text-[42px]">Proceso</span>
            </FadeOpacity>
            <div className="w-[34rem] flex flex-col items-start">
              <WordsPullUp text="sencillo para un impacto" className="font-black uppercase text-start text-[38px] mt-1 leading-9" />
              <WordsPullUp text="grande" className="font-black uppercase text-start text-[38px] mt-1 leading-9" />
            </div>
            {/* <h2 className="font-black uppercase text-start text-[38px] mt-1 w-[34rem] leading-9">sencillo para un impacto grande</h2> */}
          </div>
          <FadeOpacity>
            <div className="flex flex-col gap-12">
              <div className="flex flex-col items-start justify-center">
                <h3 className="text-[19px] uppercase font-black">Explora tu guardarropa</h3>
                <p className="text-[20px] w-[20rem] text-start leading-5">Selecciona las prendas que ya tienes y que necesitan un nuevo propósito.</p>
              </div>
              <div className="flex flex-col items-start justify-center">
                <h3 className="text-[19px] uppercase font-black">Transforma con creatividad</h3>
                <p className="text-[20px] w-[20rem] text-start leading-5">Accede a herramientas simples que te permiten visualizar nuevas formas de usarlas o rediseñarlas.</p>
              </div>
              <div className="flex flex-col items-start justify-center">
                <h3 className="text-[19px] uppercase font-black">Haz compras más conscientes</h3>
                <p className="text-[20px] w-[20rem] text-start leading-5">Elige nuevas prendas que complementen tu estilo actual sin desperdiciar.</p>
              </div>
            </div>
          </FadeOpacity>
        </div>
      </section>
      <section>
        <div className="w-[83rem] flex flex-col items-center mx-auto gap-14 justify-center h-[60rem]">
          <div className="flex flex-col items-start self-start">
            <WordsPullUp text="Beneficios Ambientales" className="font-aston text-[42px]" />
            {/* <span className="font-aston text-[42px]">Beneficios Ambientales</span> */}
            <Fade direction="up">
              <h2 className="font-black uppercase text-start text-[38px] mt-1 w-[34rem] leading-9">Ropa que cuenta historias, no residuos</h2>
            </Fade>
            <FadeOpacity>
              <p className="text-[20px] w-[36rem] text-start leading-5 mt-4">Cada prenda reutilizada es un paso hacia un futuro más sostenible. Con Be-tty, no solo renuevas tu estilo, sino que también reduces tu huella ambiental. Porque reutilizar no es solo económico, es esencial.</p>
            </FadeOpacity>
          </div>
          <motion.div
            initial={{
              opacity: 0,
              translateY: 0
            }}
            animate={{
              opacity: 1,
              translateY: 0
            }}
            transition={{
              delay: 0,
              duration: 0.5,
              ease: "easeOut",
            }}
            style={{ y: useTransform(scrollY, [2378, 3212], ['0rem', '-10rem']) }}
            className="w-[45rem] self-end"
          >
            <Image src={imgSection4} alt="Ropa que cuenta historias, no residuos" className="w-[45rem] self-end" />
          </motion.div>
        </div>
      </section>
      <section className="bg_papel min-h-screen flex items-center justify-center text-white flex-col relative overflow-hidden">
        <Image src={Plant} alt="Planta de inicio" className="absolute -right-40 -top-20" />
        <Image src={Plant} alt="Planta de inicio" className="absolute -left-40 -top-20 rotate-90" />
        <h1 className="flex flex-col items-center">
          <span className="font-black text-[60px] uppercase mt-[-1.5rem]">Únete al movimiento de la</span>
          <span className="font-aston text-[90px]">Moda circular</span>
          <span className="font-black text-[60px] uppercase mt-[-1.5rem]">con Be-tty</span>
        </h1>
        <a href="#" className="bg-white text-[#343E32] font-black py-3 px-5 uppercase">Comenzar Hoy</a>
      </section>
    </main>
  );
}
