import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ABTestContactForm from '../components/ABTestContactForm';

const ContactForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Zawsze pokaż formularz kontaktowy, niezależnie od parametrów
  return <ABTestContactForm />;
};

export default ContactForm;