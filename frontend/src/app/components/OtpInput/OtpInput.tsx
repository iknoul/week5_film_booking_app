import { ChangeEvent, useState } from 'react';

import ButtonMain from '../Buttons/ButtonMain';

import styles from './otpInput.module.css';

interface myProps {
  otpVerifyHandler: (phoneNumber: string, otp: string) => void;
  sendOtpHandler: (phoneNumber: string) => void;
  otpSendStatus: number;
}

const OtpInput: React.FC<myProps> = ({ otpVerifyHandler, sendOtpHandler, otpSendStatus}) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');

    // Handler for phone number change
    const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };

    // Handler for OTP change
    const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    };

    // Handler for sending OTP
    const handleSendOtp = () => {
        sendOtpHandler(phoneNumber);
    };

    // Handler for verifying OTP
    const handleVerifyOtp = () => {
        otpVerifyHandler(phoneNumber, otp);
    };

  	return (
    <div className={styles.inputContainer}>
		{/* Input field to enter phone number */}
		<input
			type="text"
			value={phoneNumber}
			onChange={handlePhoneNumberChange}
			placeholder="Enter Phone Number"
			className={styles.inputField}
		/>

		{/* Button to send OTP */}
		
		{
			otpSendStatus == 0&&
			<ButtonMain bg='black' callbackFunction={handleSendOtp} disabled={!phoneNumber}>
				Send OTP
			</ButtonMain>
		}
		{otpSendStatus == 1 &&
			<p className={styles.success}>Otp send succesfully</p>
		}
		{otpSendStatus === 2 &&
			<p className={styles.fail}>Error sending OTP</p>
		}

		{/* Input field to enter OTP */}
		<input
			type="text"
			value={otp}
			onChange={handleOtpChange}
			placeholder="Enter OTP"
			className={styles.inputField}
			disabled={!phoneNumber}
		/>

		{/* Button to verify OTP */}
		<ButtonMain bg='black' callbackFunction={handleVerifyOtp} disabled={!otp || !phoneNumber}>
			Verify OTP
		</ButtonMain>

		{otpSendStatus === 3 &&
			<p className={styles.success}>OTP verified successfully</p>
		}
		{otpSendStatus == 4 &&
			<p className={styles.fail}>Error verifying OTP</p>
		}
    </div>
  	);
};

export default OtpInput;
