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
      <div className={`hidden  tracking-wide lg:grid w-full text-primary-200 grid-cols-3 lg:grid-cols-4 duration-200 justify-items-center items-center py-7 text-secondary-500 ${!last && 'border-y'} borderGradient border-opacity-20`}>
        <div className='centerContent tracking-widest flex-col gap-1 font-open'>
          {
            displayTime ? (
              <>
                <p className='text-xl leading-none font-bold font-josefin'>
                  <Moment format='HH:mm'>{date}</Moment>
                </p>
                <p className='leading-none italic text-sm font-open'>
                  <Moment format='D MMMM YYYY'>
                    {date}
                  </Moment>
                </p>
              </>
            ) : (
              <>
                <p className='font-bold font-open'>
                  <Moment format='D MMMM YYYY'>{date}</Moment>
                </p>
              </>
            )
          }
        </div>

        <p className='font-medium text-lg font-josefin text-center'>{title}</p>
        <p className='hidden text-sm lg:block font-open opacity-80'>{cityCountry}</p>

        <IconHandler website={website} facebook={facebook} tickets={tickets} address={address} bands={bands} />
      </div>

      {/* MOBILE VIEW */}

      <div className='lg:hidden w-full text-primary-200 flex flex-col gap-3 opacity-80 hover:opacity-100 cursor-pointer duration-200 justify-items-center items-center py-8 border-b-2 border-primary-500 borderGradient border-opacity-20'>
        <p className='tracking-widest text-xl leading-none font-bold font-josefin'>
          <Moment format='D MMMM YYYY' className='font-bold'>
            {date}
          </Moment>
        </p>

        <p className=' text-lg font-josefin text-center'>{title}</p>
        <p className='hidden lg:block font-bold opacity-80'>{cityCountry}</p>

        <IconHandler className='mt-1' website={website} facebook={facebook} tickets={tickets} address={address} bands={bands} />
      </div>
    </>
  )
}

export default Event
