import Script from "next/script";

const clarityProjectId = "wy58mes0ax";

export function ClarityAnalytics() {
  return (
    <Script id="zes-clarity-bootstrap" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          if (c.clarity) return;
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${clarityProjectId}");
      `}
    </Script>
  );
}

