// ConcertsList.js

import React from 'react';
import Event from './Event';
import Title from '../Title';

const Events = ({ concerts, bandName, email, className, noPadding }) => {
  const mapBandProps = (bands) => {
    return bands?.map((b) => {
      const name = b?.fields?.name;
      const imageUrl = 'https:' + b?.fields?.hero?.fields?.file?.url + '?w=35';

      return { name, imageUrl };
    })
  }

  const upcomingConcerts = concerts?.upcoming?.map((c, index) => {
    const bands = mapBandProps(c?.fields?.band)

    return (
      <Event
        key={c.sys.id}
        title={c.fields.title}
        date={c.fields.dateTime}
        displayTime={c.fields.displayTime}
        cityCountry={c.fields.cityCountry}
        address={c.fields.address}
        bands={bands}
        website={c.fields.website}
        facebook={c.fields.facebook}
        tickets={c.fields.tickets}
        first={index === 0}
        last={index + 1 === concerts.upcoming.length}
      />
    )
  })

  const noUpcomingConcerts = (
    <div className='centerContent flex-col container relative w-full p-6 bg-primary-950 rounded shadow-lg'>
      {
        bandName ? (
          <div className='text-center font-khorla text-primary-100 tracking-wider leading-relaxed py-1'>
            <p className='text-xl pb-1'>
              {bandName} has no upcoming concerts at this moment
            </p>
            {
              email && (
                <p>contact <a className='text-accent-500 text-sm' href={`mailto:${email}`}>{email}</a> to book a concert</p>
              )
            }
          </div>
        ) : (
          <div className='text-center font-khorla text-primary-100 tracking-wider py-1'>
            <p className='text-xl pb-1'>
              No upcoming concerts at this moment
            </p>
            {
              email && (
                <p>contact <a className='text-accent-500 text-sm' href={`mailto:${email}`}>{email}</a> to book a concert</p>
              )
            }
          </div>
        )
      }
    </div>
  );

  const previousConcerts = concerts?.previous?.map((c, index) => {
    const bands = mapBandProps(c?.fields?.band)

    return (
      <Event
        key={c.sys.id}
        title={c.fields.title}
        date={c.fields.dateTime}
        displayTime={c.fields.displayTime}
        cityCountry={c.fields.cityCountry}
        address={c.fields.address}
        bands={bands}
        website={c.fields.website}
        facebook={c.fields.facebook}
        tickets={c.fields.tickets}
        first={index === 0}
        last={index + 1 === concerts.previous.length}
      />
    )
  })

  return (
    <div className={`flex flex-col ${concerts?.previous?.length && 'gap-10 md:gap-16'} ${!noPadding && 'py-10 md:py-16'} ${className}`}>
      <div className='container flex flex-col px-4 gap-10'>
        <Title title='Upcoming' />
        {upcomingConcerts?.length ? upcomingConcerts : noUpcomingConcerts}
      </div>

      {previousConcerts?.length > 0 && (
        <div className='container flex flex-col px-4 gap-10'>
          <Title title='Previous' />
          {previousConcerts}
        </div>
      )}
    </div>
  );
};

export default Events