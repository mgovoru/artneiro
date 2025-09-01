import ThreeDTextPage from './compoments/3D/ThreeDTextPage';
import Squares from './compoments/Squares/Squares';


export default function Home() {
  function F(){return  }


  return (
    <div className='canvas-wrapper' >
      <div className='squares-canvas'>
        <Squares
          speed={0.5}
          squareSize={70}
          direction='diagonal' // up, down, left, right, diagonal
          borderColor='#fff'
          hoverFillColor='#222'
          
        />
      </div>
      <div className='three-d-text'>
        <ThreeDTextPage />{' '}
      </div>{' '}
    </div>
  );
}
