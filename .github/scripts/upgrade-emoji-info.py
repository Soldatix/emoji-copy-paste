from pathlib import Path

page = Path('app/page.tsx')
css = Path('app/globals.css')

s = page.read_text(encoding='utf-8')
marker = 'function InfoDialog({ language }: { language: Language }) {'
if marker not in s:
    raise SystemExit('InfoDialog marker not found')
head, _ = s.split(marker, 1)

new_function = r'''function InfoDialog({ language }: { language: Language }) {
  const t = ui[language];
  const paymentUi = {
    en: { paypalDesc: "Pay securely with PayPal or other payment options offered by PayPal Checkout.", stripeDesc: "Pay securely by card or with payment methods available through Stripe Checkout.", cards: "Debit / Credit Card", wallets: "Digital wallets", paypalBtn: "Donate with PayPal ↗", stripeBtn: "Donate with Stripe ↗", availability: "Available payment methods can vary by country, device and payment provider.", copy: "Copy" },
    hr: { paypalDesc: "Platite sigurno putem PayPala ili drugim načinima plaćanja koje nudi PayPal Checkout.", stripeDesc: "Platite sigurno karticom ili načinima plaćanja dostupnima putem Stripe Checkouta.", cards: "Debitna / kreditna kartica", wallets: "Digitalni novčanici", paypalBtn: "Doniraj putem PayPala ↗", stripeBtn: "Doniraj putem Stripea ↗", availability: "Dostupni načini plaćanja mogu se razlikovati ovisno o državi, uređaju i pružatelju plaćanja.", copy: "Kopiraj" },
    de: { paypalDesc: "Sicher mit PayPal oder weiteren von PayPal Checkout angebotenen Zahlungsmethoden bezahlen.", stripeDesc: "Sicher per Karte oder mit den über Stripe Checkout verfügbaren Zahlungsmethoden bezahlen.", cards: "Debit- / Kreditkarte", wallets: "Digitale Wallets", paypalBtn: "Mit PayPal spenden ↗", stripeBtn: "Mit Stripe spenden ↗", availability: "Verfügbare Zahlungsmethoden können je nach Land, Gerät und Zahlungsanbieter variieren.", copy: "Kopieren" },
    it: { paypalDesc: "Paga in modo sicuro con PayPal o con gli altri metodi disponibili tramite PayPal Checkout.", stripeDesc: "Paga in modo sicuro con carta o con i metodi disponibili tramite Stripe Checkout.", cards: "Carta di debito / credito", wallets: "Portafogli digitali", paypalBtn: "Dona con PayPal ↗", stripeBtn: "Dona con Stripe ↗", availability: "I metodi di pagamento disponibili possono variare in base al Paese, al dispositivo e al fornitore di pagamento.", copy: "Copia" },
    es: { paypalDesc: "Paga de forma segura con PayPal u otros métodos disponibles mediante PayPal Checkout.", stripeDesc: "Paga de forma segura con tarjeta o con los métodos disponibles mediante Stripe Checkout.", cards: "Tarjeta de débito / crédito", wallets: "Carteras digitales", paypalBtn: "Donar con PayPal ↗", stripeBtn: "Donar con Stripe ↗", availability: "Los métodos de pago disponibles pueden variar según el país, el dispositivo y el proveedor de pago.", copy: "Copiar" },
  } as const;
  const p = paymentUi[language] || paymentUi.en;
  const copyAddress = async (currency: string, address: string) => { await copyText(address); toast.success(`${currency} ${t.addressCopied}`); };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="info-button" variant="outline"><Info /> <span>{t.info}</span></Button>
      </DialogTrigger>
      <DialogContent className="support-dialog">
        <DialogHeader className="support-header">
          <div className="support-kicker"><Info size={16} /> INFO & SUPPORT</div>
          <DialogTitle>{t.supportTitle}</DialogTitle>
          <DialogDescription>{t.supportIntro}</DialogDescription>
        </DialogHeader>
        <div className="support-scroll">
          <p className="charity-copy">{t.charity}</p>
          <h3>{t.donateTo}</h3>

          <div className="payment-grid">
            <article className="payment-card paypal-card">
              <div className="payment-brand"><span className="payment-symbol">P</span><h4>PayPal</h4></div>
              <p>{p.paypalDesc}</p>
              <div className="payment-badges"><span>PayPal</span><span>{p.cards}</span><span>Apple Pay</span></div>
              <a className="payment-action" href="https://www.paypal.com/ncp/payment/RU2CWCNVQ7XD6" target="_blank" rel="noreferrer">{p.paypalBtn}</a>
            </article>

            <article className="payment-card stripe-card">
              <div className="payment-brand"><span className="payment-symbol">S</span><h4>Stripe</h4></div>
              <p>{p.stripeDesc}</p>
              <div className="payment-badges"><span>{p.cards}</span><span>Link</span><span>{p.wallets}</span></div>
              <a className="payment-action" href="https://buy.stripe.com/7sYeVd7Blfe89cm0k02kw00" target="_blank" rel="noreferrer">{p.stripeBtn}</a>
            </article>
          </div>
          <p className="payment-availability">{p.availability}</p>

          <div className="crypto-heading"><div className="crypto-icon">₿</div><div><h3>{t.crypto}</h3><p>{t.cryptoText}</p></div></div>
          <div className="wallet-list">{cryptoWallets.map(([currency, address]) => <div className="wallet-row" key={currency}><span className="currency">{currency}</span><code>{address}</code><Button variant="outline" size="sm" onClick={() => copyAddress(currency, address)}><Copy /> {p.copy}</Button></div>)}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
'''
page.write_text(head + new_function, encoding='utf-8')

c = css.read_text(encoding='utf-8')
css_marker = '@media (max-width: 1050px)'
if css_marker not in c:
    raise SystemExit('CSS media marker not found')
if '.payment-standard-v2' in c:
    raise SystemExit('Payment standard styles already installed')

new_css = r'''
/* payment-standard-v2: Apps & Games Info standard */
.payment-standard-v2 { display: none; }
.payment-card { display: flex; flex-direction: column; min-width: 0; padding: 17px; gap: 0; border: 1px solid var(--border); border-radius: 17px; background: color-mix(in srgb, var(--card) 96%, var(--secondary)); }
.payment-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 9px; }
.payment-brand h4 { margin: 0; font-size: 15px; }
.payment-symbol { width: 42px; height: 42px; flex: 0 0 42px; display: grid; place-items: center; border-radius: 12px; color: #1484e8; background: color-mix(in srgb, #1594ff 10%, var(--card)); border: 1px solid color-mix(in srgb, #1594ff 34%, var(--border)); font-weight: 900; }
.stripe-card .payment-symbol { color: #d89b00; background: color-mix(in srgb, #ffd54b 12%, var(--card)); border-color: color-mix(in srgb, #ffd54b 45%, var(--border)); }
.payment-card > p { margin: 0; color: var(--muted-foreground); font-size: 12px; line-height: 1.5; }
.payment-badges { display: flex; flex-wrap: wrap; gap: 7px; margin: 14px 0 16px; }
.payment-badges span { min-height: 27px; display: inline-flex; align-items: center; padding: 4px 9px; border: 1px solid var(--border); border-radius: 999px; color: var(--muted-foreground); background: var(--muted); font-size: 10.5px; font-weight: 800; }
.payment-action { min-height: 44px; margin-top: auto; padding: 10px 12px; display: flex; align-items: center; justify-content: center; border-radius: 11px; color: #07101b; background: linear-gradient(90deg,#54e8ff,#4da3ff); font-size: 12px; font-weight: 900; text-align: center; text-decoration: none; transition: filter .18s ease, transform .18s ease; }
.stripe-card .payment-action { background: linear-gradient(90deg,#ffe45c,#ffb84d); }
.payment-action:hover { filter: brightness(1.04); transform: translateY(-1px); }
.payment-availability { margin: 12px 1px 24px; color: var(--muted-foreground); font-size: 11px; line-height: 1.5; }
'''
c = c.replace(css_marker, new_css + '\n' + css_marker, 1)
css.write_text(c, encoding='utf-8')

print('Emoji Info upgraded')
