import { FaInstagram, FaSpotify, FaTiktok, FaYoutube, FaFacebook, FaSoundcloud } from 'react-icons/fa';

const ICONS = {
  Instagram: FaInstagram,
  Spotify: FaSpotify,
  TikTok: FaTiktok,
  YouTube: FaYoutube,
  Facebook: FaFacebook,
  SoundCloud: FaSoundcloud,
};

export default function PlatformIcon({ platform, ...props }) {
  const Icon = ICONS[platform];
  return Icon ? <Icon aria-hidden="true" focusable="false" {...props} /> : null;
}
