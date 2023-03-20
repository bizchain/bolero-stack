import { Footer, footerStyle, Header, headerStyle } from "~/components";

export function links(){
	return [
		...headerStyle(),
		...footerStyle()
	]
}

export default function Index() {
  return (
    <div>
      <Header />

      <Footer />
    </div>
  );
}
