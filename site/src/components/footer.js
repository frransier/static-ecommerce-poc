import React from 'react'

const Footer = () => (
  <footer className="site-footer" role="contentinfo">
    <section className="section section--no-y-padding">
      <div className="grid grid--no-gutter-xs grid--col-xs-1">
        <div className="grid__item grid__item--no-gutter-xs grid__item--6">
          <ul className="accordion site-footer__accordion">
            <li className="accordion__collapsible">
              <div className="collapsible" data-js="collapsible">
                <div className="collapsible__title">
                  Om oss
                  <svg className="icon icon--fill collapsible__icon" aria-hidden="true">
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#plus" />
                  </svg><span className="hide-visually">SR only text</span>
                </div>
                <div className="collapsible__content-wrapper">
                  <div className="collapsible__content">
                    Something
                  </div>
                </div>
              </div>
            </li>
            <li className="accordion__collapsible">
              <div className="collapsible" data-js="collapsible">
                <div className="collapsible__title">
                  Varumärken
                  <svg className="icon icon--fill collapsible__icon" aria-hidden="true">
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#plus" />
                  </svg><span className="hide-visually">SR only text</span>
                </div>
                <div className="collapsible__content-wrapper">
                  <div className="collapsible__content">
                    Something
                  </div>
                </div>
              </div>
            </li>
            <li className="accordion__collapsible">
              <div className="collapsible" data-js="collapsible">
                <div className="collapsible__title">
                  Kontakt
                  <svg className="icon icon--fill collapsible__icon" aria-hidden="true">
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#plus" />
                  </svg><span className="hide-visually">SR only text</span>
                </div>
                <div className="collapsible__content-wrapper">
                  <div className="collapsible__content">
                    Something
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="grid__item grid__item--no-gutter-xs grid__item--6">
          <ul className="accordion site-footer__accordion">
            <li className="accordion__collapsible">
              <div className="collapsible" data-js="collapsible">
                <div className="collapsible__title">
                  Jaktia-kortet
                  <svg className="icon icon--fill collapsible__icon" aria-hidden="true">
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#plus" />
                  </svg><span className="hide-visually">SR only text</span>
                </div>
                <div className="collapsible__content-wrapper">
                  <div className="collapsible__content">
                    Something
                  </div>
                </div>
              </div>
            </li>
            <li className="accordion__collapsible">
              <div className="collapsible" data-js="collapsible">
                <div className="collapsible__title">
                  Club Jaktia
                  <svg className="icon icon--fill collapsible__icon" aria-hidden="true">
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#plus" />
                  </svg><span className="hide-visually">SR only text</span>
                </div>
                <div className="collapsible__content-wrapper">
                  <div className="collapsible__content">
                    Something
                  </div>
                </div>
              </div>
            </li>
            <li className="accordion__collapsible">
              <div className="collapsible" data-js="collapsible">
                <div className="collapsible__title">
                  Sociala medier
                  <svg className="icon icon--fill collapsible__icon" aria-hidden="true">
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#plus" />
                  </svg><span className="hide-visually">SR only text</span>
                </div>
                <div className="collapsible__content-wrapper">
                  <div className="collapsible__content">
                    Something
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="grid__item grid__item--no-gutter-xs grid__item--6">
          <ul className="list list--unstyled h-padding-top-lg">
            <li className="list-item list-item--no-padding">
              {/* <a href="#" className="site-footer__link">Köp- och leveransvillkor</a> */}
            </li>
            <li className="list-item list-item--no-padding">
              {/* <a href="#" className="site-footer__link">Garantier</a> */}
            </li>
            <li className="list-item list-item--no-padding">
              {/* <a href="#" className="site-footer__link">Integritetspolicy</a> */}
            </li>
            <li className="list-item list-item--no-padding">
              {/* <a href="#" className="site-footer__link">Nyhetsbrev</a> */}
            </li>
          </ul>
          <ul className="list list--unstyled list--horizontal site-footer__icon-list">
            <li className="list-item site-footer__icon-list-item">
              {/* <a href="#">
                <svg className="icon icon--fill" aria-hidden="true">
                  <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#flag-se" />
                </svg><span className="hide-visually">SR only text</span>
              </a> */}
            </li>
            <li className="list-item site-footer__icon-list-item">
              {/* <a href="#">
                <svg className="icon icon--fill" aria-hidden="true">
                  <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#flag-dk" />
                </svg><span className="hide-visually">SR only text</span>
              </a> */}
            </li>
            <li className="list-item site-footer__icon-list-item">
              {/* <a href="#">
                <svg className="icon icon--fill" aria-hidden="true">
                  <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#flag-no" />
                </svg><span className="hide-visually">SR only text</span>
              </a> */}
            </li>
          </ul>
        </div>
        <div className="grid__item grid__item--no-gutter-xs grid__item--6">
          <div className="site-footer__text h-padding-top-lg">
            © Copyright | Jaktia 2018 <br />Den här webbplatsen använder cookies|Alla priser gäller
            så långt lagret räcker och kan inte kombineras med andra erbjudanden|Sortimentet kan
            variera från butik till butik |Med reservation
            för eventuella valutaförändringar, avvikelser och tryckfel
          </div>
          <ul className="list list--unstyled list--horizontal site-footer__icon-list">
            <li className="list-item site-footer__icon-list-item">
              <svg className="icon icon--fill icon--lg" aria-hidden="true">
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#visa" />
              </svg><span className="hide-visually">SR only text</span>
            </li>
            <li className="list-item site-footer__icon-list-item">
              <svg className="icon icon--fill icon--lg" aria-hidden="true">
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#mastercard" />
              </svg><span className="hide-visually">SR only text</span>
            </li>
            <li className="list-item site-footer__icon-list-item">
              <svg className="icon icon--fill icon--lg" aria-hidden="true">
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#amex" />
              </svg><span className="hide-visually">SR only text</span>
            </li>
            <li className="list-item site-footer__icon-list-item">
              <svg className="icon icon--fill icon--xl" aria-hidden="true">
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#https" />
              </svg><span className="hide-visually">SR only text</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </footer>
)


export default Footer
