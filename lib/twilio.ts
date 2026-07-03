// lib/twilio.ts
import twilio from 'twilio';

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (!twilioAccountSid || !twilioAuthToken || !twilioPhoneNumber) {
  console.warn('Twilio credentials not configured');
}

const twilioClient = twilio(twilioAccountSid, twilioAuthToken);

export { twilioClient };

export async function initiateCall(toNumber: string, fromNumber: string = twilioPhoneNumber!) {
  try {
    const call = await twilioClient.calls.create({
      from: fromNumber,
      to: toNumber,
      url: `${process.env.NEXTAUTH_URL}/api/twilio/twiml`,
    });
    return call;
  } catch (error) {
    console.error('Twilio call initiation error:', error);
    throw error;
  }
}

export async function sendSMS(toNumber: string, message: string) {
  try {
    const sms = await twilioClient.messages.create({
      from: twilioPhoneNumber,
      to: toNumber,
      body: message,
    });
    return sms;
  } catch (error) {
    console.error('Twilio SMS error:', error);
    throw error;
  }
}

export async function getCallRecording(callSid: string) {
  try {
    const recordings = await twilioClient.calls(callSid).recordings.list({ limit: 1 });
    if (recordings.length > 0) {
      return recordings[0];
    }
    return null;
  } catch (error) {
    console.error('Twilio recording fetch error:', error);
    return null;
  }
}

export function generateTwiML(message: string = 'Call connected') {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Say voice="alice">${message}</Say>
    </Response>`;
}
