import React from 'react';
import WhatsAppButton from "../../partials/Whatsapp/whatsapp";
import { Stack } from 'react-bootstrap';

const KemendikbudPage = () => {
  return (
    <Stack style={{ height: '100vh', width: '100%' }}>
      <iframe
        src="https://www.kemdikbud.go.id/"
        title="Kemdikbud"
        style={{ border: 'none', width: '100%', height: '100%' }}
        allowFullScreen
      />
      <WhatsAppButton />
    </Stack>
  );
};

export default KemendikbudPage;
