import React from 'react';
import Image from 'next/image';

interface LocationDisplayProps {
  city: string;
  country: string;
  className?: string;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({ city, country, className="body-s" }) => {
  // Convert country names to ISO codes
  const getCountryCode = (countryName: string | undefined): string | null => {
    if (!countryName) return null;
    
    const countryMap: Record<string, string> = {
      'united states': 'US',
      'usa': 'US',
      'america': 'US',
      'united kingdom': 'GB',
      'uk': 'GB',
      'england': 'GB',
      'britain': 'GB',
      'canada': 'CA',
      'germany': 'DE',
      'france': 'FR',
      'italy': 'IT',
      'spain': 'ES',
      'netherlands': 'NL',
      'belgium': 'BE',
      'switzerland': 'CH',
      'austria': 'AT',
      'portugal': 'PT',
      'ireland': 'IE',
      'sweden': 'SE',
      'norway': 'NO',
      'denmark': 'DK',
      'finland': 'FI',
      'poland': 'PL',
      'czech republic': 'CZ',
      'hungary': 'HU',
      'slovakia': 'SK',
      'slovenia': 'SI',
      'croatia': 'HR',
      'romania': 'RO',
      'bulgaria': 'BG',
      'greece': 'GR',
      'turkey': 'TR',
      'russia': 'RU',
      'ukraine': 'UA',
      'japan': 'JP',
      'south korea': 'KR',
      'china': 'CN',
      'india': 'IN',
      'australia': 'AU',
      'new zealand': 'NZ',
      'brazil': 'BR',
      'argentina': 'AR',
      'chile': 'CL',
      'mexico': 'MX',
      'south africa': 'ZA',
      'israel': 'IL',
      'saudi arabia': 'SA',
      'uae': 'AE',
      'singapore': 'SG',
      'thailand': 'TH',
      'malaysia': 'MY',
      'indonesia': 'ID',
      'philippines': 'PH',
      'vietnam': 'VN',
      'colombia': 'CO'
    };
    
    return countryMap[countryName.toLowerCase()] || null;
  };

  const countryCode = getCountryCode(country);

  return (
    <div className={`${className} flex gap-[var(--spacing-200)] items-center`}>
      {countryCode && (
        <div className="icon-size-s relative">
          <Image
            src={`/assets/flags/${countryCode.toLowerCase()}.svg`}
            alt={`${country} flag`}
            fill
            className="object-cover"
          />
        </div>
      )}
      {city}, {country}
    </div>
  );
};

export default LocationDisplay;