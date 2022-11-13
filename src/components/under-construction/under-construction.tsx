import Image from 'next/image'

const UnderConstruction = () => {
  return (
    <div className="w-full text-center">
      <Image
        src={'/images/working-on-it.svg'}
        blurDataURL="/images/working-on-it.svg"
        placeholder="blur"
        width={1280}
        height={640}
        alt="Under Construction"
        priority
      />
      <h5 className="mb-2 text-xl font-bold dark:text-white md:text-2xl">
        Page under construction
      </h5>
      <span className="md:text-normal text-sm dark:text-white/80">
        Illustration by{' '}
        <a href="https://icons8.com/illustrations/author/ARh4OKrFtdfC">
          Pixeltrue
        </a>{' '}
        from <a href="https://icons8.com/illustrations">Ouch!</a>
      </span>
    </div>
  )
}

export default UnderConstruction
