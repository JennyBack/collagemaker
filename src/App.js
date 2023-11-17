import CollageMaker from './components/CollageMaker';
import image1 from './assets/images/pexels-carsten-kohler-13063592.jpg';
import image2 from './assets/images/pexels-joana-hahn-18820159.jpg';
import image3 from './assets/images/pexels-ozan-çulha-17843612.jpg';
import image4 from './assets/images/pexels-rohi-bernard-codillo-17967048.jpg';

export const imagesArray = [
    image1,
    image2,
    image3,
    image4
];

function App() {
  return (
      <div style={{display:'flex', justifyContent:'center',alignItems:'center',height:'100%'}}>
        <CollageMaker images={imagesArray}/>
      </div>
  );
}

export default App;
