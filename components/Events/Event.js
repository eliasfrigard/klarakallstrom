import Moment from 'react-moment'
import IconHandler from '../IconHandler'

const Event = ({
  title,
  date,
  displayTime,
  cityCountry,
  address,
  bands,
  website,
  facebook,
  tickets,
  last = false,
  first = false,
}) => {
  return (
    <>
      <div className={`hidden lg:grid w-full text-primary-200 grid-cols-3 lg:grid-cols-4 duration-200 justify-items-center items-center py-7 text-secondary-500 ${!last && 'border-y'} borderGradient border-opacity-20 font-josefin`}>
        <div className='centerContent flex-col gap-1 tracking-wider'>
          {
            displayTime ? (
              <>
                <p className='text-2xl uppercase font-bold leading-none'>
                  <Moment format='HH:mm'>{date}</Moment>
                </p>
                <p className='text-base leading-none uppercase'>
                  <Moment format='D MMMM YYYY' className='font-bold'>
                    {date}
                  </Moment>
                </p>
              </>
            ) : (
              <>
                <p className='uppercase font-bold leading-none'>
                  <Moment format='D MMMM'>{date}</Moment>
                </p>
                <p className='text-2xl leading-none uppercase'>
                  <Moment format='YYYY' className='font-bold'>
                    {date}
                  </Moment>
                </p>
              </>
            )
          }
        </div>

        <p className='font-medium text-lg text-center'>{title}</p>
        <p className='hidden lg:block font-medium opacity-80'>{cityCountry}</p>

        <IconHandler website={website} facebook={facebook} tickets={tickets} address={address} bands={bands} />
      </div>

      {/* MOBILE VIEW */}

      <div className='lg:hidden w-full text-primary-200 flex flex-col gap-7 opacity-80 hover:opacity-100 cursor-pointer duration-200 justify-items-center items-center py-10 border-b-2 border-primary-500 border-opacity-20'>
        <p className='text-xl leading-none uppercase'>
          <Moment format='D MMMM YYYY' className='font-bold'>
            {date}
          </Moment>
        </p>

        <p className='font-bold text-lg text-center'>{title}</p>
        <p className='hidden lg:block font-bold opacity-80'>{cityCountry}</p>

        <IconHandler website={website} facebook={facebook} tickets={tickets} address={address} bands={bands} />
      </div>
    </>
  )
}

export default Event
