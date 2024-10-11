import React, { useState, useEffect } from 'react';  // Import useEffect for animation timing
import { IonContent, IonHeader, IonPage, IonToolbar, IonInput, IonButton, IonText, IonItem, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { eyeOff, eye } from 'ionicons/icons';  // Import icons
import './Login.css';
import { loginUser, registerUser } from '../firebaseConfig';  // Import your Firebase config
import backgroundSVG from '../assets/bestdeal.svg'; // Adjust the path as neede
const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const history = useHistory();

  const [isAnimationComplete, setIsAnimationComplete] = useState<boolean>(false);  // Animation state

  // Run the animation and hide it after 3.5s
  useEffect(() => {
    setTimeout(() => {
      setIsAnimationComplete(true);
    }, 2000);  // Total duration of animation (2s fall + 1.5s spread)
  }, []);

  // Login function
  async function login() {
    if (email && password) {
      try {
        console.log("logiggggg....gin");
        
        const res = await loginUser(email, password);
        if (res) {
          history.push('/home');
        } else {
          setErrorMessage('Login failed. Please check your credentials.');
        }
      } catch (error) {
        setErrorMessage(`Login error: `);
      }
    } else {
      setErrorMessage('Incomplete credentials');
    }
  }

  // Sign-up function
  async function signUp() {
    try {
      const res = await registerUser(email, password);
      if (res) {
        alert('Verification email sent. Please check your inbox to verify your account.');
      } else {
        setErrorMessage('Sign-up failed. Try again.');
      }
    } catch (error) {
      setErrorMessage(`Sign-up error: `);
    }
  }

  // Toggle between login and sign-up forms
  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setErrorMessage('');  // Reset error message when switching forms
  };

  return (
    <IonPage>
      {/* Animation container */}
      { !isAnimationComplete && (
    <div id="drop-container">
      <div id="drop"></div>
      <div id="splash-text">NUM ERO UNO</div> {/* Text displayed during splash */}
    </div>
  )}

      {/* Login Form */}
      <IonHeader>
        
      </IonHeader>

        <IonContent className="FullPage">
         
          <div className="login-container" >
            <div className="divtest"></div>
            <div className="divsvg1"></div>
            <IonText className="login-title">
              {isSignUp ? "Create a new account" : "Log into your account"}
            </IonText>

            {/* Common Email Input */}
            {/* Email Input */}
<IonItem lines="none" className="password-input">
<IonInput
    type="email"
    placeholder="Enter your Email"
    value={email}
    onIonChange={(e) => setEmail(e.detail.value!)}
    className="pass"
  />
</IonItem>
 
{/* Password Input with Eye Icon for Toggle */}
<IonItem lines="none" className="password-input">
<IonInput
    type={showPassword ? "text" : "password"}
    placeholder="Enter Password"
    value={password}
    onIonChange={(e) => setPassword(e.detail.value!)}
  />
<IonIcon
    slot="end"
    icon={showPassword ? eyeOff : eye}
    onClick={() => setShowPassword(!showPassword)}
  />
</IonItem>
            {/* Conditional rendering for login or sign-up */}
            {isSignUp ? (
              <IonButton shape="round" expand="block" onClick={signUp} className="otp-button">
                Sign Up
              </IonButton>
            ) : (
              <IonButton shape="round" expand="block" onClick={login} className="otp-button">
                Login 
              </IonButton>
            )}

            {errorMessage && (
              <IonText color="danger" className="error-text">
                {errorMessage}
              </IonText>
            )}
          <IonToolbar className='logbottom'>

            <h3>{isSignUp ? "Already a user?" : "Don't have an account ?"}</h3>
          <IonButton slot="end" onClick={toggleSignUp} fill="outline">
            {isSignUp ? "Login" : "Register"}
          </IonButton>
        </IonToolbar>
          </div>
        </IonContent>
    </IonPage>
  );
};

export default Login;
