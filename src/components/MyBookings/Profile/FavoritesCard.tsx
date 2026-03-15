type FavoritePartner = {
  name: string;
  location: string;
  rating: number;
  profilePic: string;
};

type FavoriteExperience = {
  name: string;
  location: string;
  price: number;
  image: string;
};

type FavoritesCardProps = {
  favoritePartners: FavoritePartner[];
  favoriteExperiences: FavoriteExperience[];
  onShowFavoritePartners: () => void;
  onShowFavoriteExperiences: () => void;
};

const InfoTooltip = ({ text }: { text: string }) => (
  <div className="relative group">
    <button
      className="w-5 h-5 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors text-xs"
      type="button"
    >
      ?
    </button>
    <div className="absolute right-0 top-full mt-2 bg-gray-100 p-4 rounded-lg shadow-md text-sm text-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-48">
      {text}
    </div>
  </div>
);

export default function FavoritesCard({
  favoritePartners,
  favoriteExperiences,
  onShowFavoritePartners,
  onShowFavoriteExperiences,
}: FavoritesCardProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gradient-to-br from-orange-100 to-orange-300 p-4 rounded-lg shadow-md border border-orange-200">
          <div className="w-full flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-orange-800">
              Favorite HiPartners
            </h3>
            <InfoTooltip text="View your saved favorite sustainable tourism partners." />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onShowFavoritePartners}
              className="text-2xl font-bold text-orange-500 hover:text-orange-600 transition-colors"
            >
              {favoritePartners.length}
            </button>
            <div
              onClick={onShowFavoritePartners}
              className="flex flex-col cursor-pointer group"
            >
              <div className="text-xs font-medium text-orange-800">
                Saved Partners
              </div>
              <div className="text-xs text-orange-500 group-hover:text-orange-600">
                Click to view all
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-100 to-orange-300 p-4 rounded-lg shadow-md border border-orange-200">
          <div className="w-full flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-orange-800">
              Favorite Experiences
            </h3>
            <InfoTooltip text="View your saved favorite sustainable experiences." />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onShowFavoriteExperiences}
              className="text-2xl font-bold text-orange-500 hover:text-orange-600 transition-colors"
            >
              {favoriteExperiences.length}
            </button>
            <div
              onClick={onShowFavoriteExperiences}
              className="flex flex-col cursor-pointer group"
            >
              <div className="text-xs font-medium text-orange-800">
                Saved Experiences
              </div>
              <div className="text-xs text-orange-500 group-hover:text-orange-600">
                Click to view all
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
