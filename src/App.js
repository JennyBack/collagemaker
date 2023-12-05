import CollageMaker from './components/CollageMaker';
import image1 from './assets/images/pexels-carsten-kohler-13063592.jpg';
import image2 from './assets/images/pexels-joana-hahn-18820159.jpg';
import image3 from './assets/images/pexels-ozan-çulha-17843612.jpg';
import image4 from './assets/images/pexels-rohi-bernard-codillo-17967048.jpg';
import image5 from './assets/images/pexels-anete-lusina-6331086.jpg';
import image6 from './assets/images/pexels-brenoanp-1136571.jpg';
import image7 from './assets/images/pexels-constantin-1008180.jpg';

export const imagesArray = [image1, image2, image3, image4, image5, image6, image7];

function App() {
    return <CollageMaker images={imagesArray.length > 0 ? imagesArray : []} />;
}

export default App;
