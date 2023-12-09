import React from 'react';
import BannerSlider from './components/Banner';
import VersityCard from './components/VarsityCard';

const Versities
 = () => {

  const versityList = [
     {
      title: 'University of Nairobi ',
      location: 'Nairobi',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMLqUgEpdIX9Uombald4iqt2Kf067a3nA_zIZb7Nb1XM-B0XNJsKh6wGNgCqmKBhF9tEc&usqp=CAU',

    },
    {
      title: 'University of Eldoret',
      location: 'Eldoret',
      image: 'https://images.hivisasa.com/1200/DSIl2RmJiSIMG_20180215_175157.jpg',
    },
    {
      title: 'Kenyatta University ',
      location: 'Ruiru',
      image: 'https://nairobiwire.com/wp-content/uploads/2021/11/KU.jpg',
    },
 {
      title: 'Kisii University ',
      location: 'Kisii',
      image: 'https://netstorage-tuko.akamaized.net/images/b905c3acb644dfd3.jpg?imwidth=900',
    },
     {
      title: 'Mt Kenya University ',
      location: 'Nairobi',
      image: 'data:image/jpeg;base64,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',
    },
  ];

  return (
    <div className="container ">
      <BannerSlider />
      <div className="lg:ml-10 sm:ml mt-5">
    
      <h2 className="text-xl font-semibold lg:mb-4 sm:ml-4">Universities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        { versityList.map((event, index) => (
          <VersityCard key={index} event={event} />
        ))}
      </div>
    </div>
     </div>
  );
};

export default Versities
;
