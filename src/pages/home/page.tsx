import TypingHeader from "../../components/common/tiping";

const poema = `
  A ti, mi amor, en mi corazón guardada

  En la vasta quietud de la noche clara,
  mi alma te busca, mi mente te llama.
  Tus ojos, estrellas de dulce fulgor,
  son la luz que guía mi caminar errante.

  Eres el faro que en mis días brilla,
  la melodía que en mi pecho resuena.
  Cada palabra que de tu boca brota
  es un verso eterno que mi ser atesora.

  En tus brazos hallé el refugio
  que mi corazón siempre soñó encontrar.
  Tu amor, mi razón de ser,
  es el río que calma mi sed.

  No hay joya más preciosa que tu sonrisa,
  ni paz más grande que tu ternura infinita.
  Te amo, y en este sentir tan profundo,
  encuentro mi razón, mi todo, mi mundo.
`;

export default function home() {
  return (
    <div className="flex flex-col w-full h-full min-h-screen justify-center items-center ">
      <TypingHeader />
      <div className="whitespace-pre-wrap text-lg font-serif leading-relaxed p-4 bg-gray-100/5 rounded-lg shadow-md w-auto lg:w-[600px] mt-6 text-center">
      {poema}
    </div>
    </div>
  )
};