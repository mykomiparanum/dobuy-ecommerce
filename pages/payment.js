import {
	Button,
	FormControl,
	FormControlLabel,
	List,
	ListItem,
	Radio,
	RadioGroup,
	Typography,
} from '@material-ui/core';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import CheckoutWizard from '../components/checkoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import useStyle from '../utils/styles';

const Payment = () => {
	const classes = useStyle();
	const { state, dispatch } = useContext(Store);
	const {
		cart: { shippingAddress },
	} = state;
	const router = useRouter();

	const [paymentMethod, setPaymentMethod] = useState('');
	useEffect(() => {
		if (!shippingAddress.address) {
			router.push('/shipping');
		} else {
			setPaymentMethod(Cookies.get('paymentMethod') || '');
		}
	}, []);

	const submitHandler = (e) => {
		e.preventDefault();

		if (!paymentMethod) {
			alert('payment method is required');
		} else {
			dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
			Cookies.set('paymentMethod', paymentMethod);
			router.push('/placeorder');
		}
	};
	return (
		<Layout title='Payment Method'>
			<CheckoutWizard active={2} />
			<form className={classes.form} onSubmit={submitHandler}>
				<Typography component='h1' variant='h1'>
					Payment Method
				</Typography>
				<List>
					<ListItem>
						<FormControl component='fieldset'>
							<RadioGroup
								aria-label='Payment Method'
								name='paymentMethod'
								value={paymentMethod}
								onChange={(e) => setPaymentMethod(e.target.value)}
							>
								<FormControlLabel
									label='Paypal'
									value='Paypal'
									control={<Radio />}
								></FormControlLabel>
								<FormControlLabel
									label='Stripe'
									value='Stripe'
									control={<Radio />}
								></FormControlLabel>
								<FormControlLabel
									label='Cash'
									value='Cash'
									control={<Radio />}
								></FormControlLabel>
							</RadioGroup>
						</FormControl>
					</ListItem>
					<ListItem>
						<Button fullWidth type='submit' variant='contained' color='primary'>
							Continue
						</Button>
						<Button
							fullWidth
							type='submit'
							variant='outlined'
							onClick={() => router.push('/shipping')}
						>
							Back
						</Button>
					</ListItem>
				</List>
			</form>
		</Layout>
	);
};

export default Payment;
