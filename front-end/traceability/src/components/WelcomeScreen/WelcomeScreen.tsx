import greenBackground from '@assets/green-background.jpg';

const WelcomeScreen = () => {
  return (
    <div
            style={{
              display: 'flex',
              padding: '20px',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              backgroundImage: `url(${greenBackground})`, // Use the imported image
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'white', // White text color
              fontSize: '50px',
              fontWeight: 'bold',
            }}
          >
            Welcome to the product traceability system
          </div>
  )
}

export default WelcomeScreen