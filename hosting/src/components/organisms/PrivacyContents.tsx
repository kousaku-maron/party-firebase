import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Typography, { TypographyProps } from '@material-ui/core/Typography'
import { PinnedTypography } from '../atoms'

type Props = {
  size?: 'small' | 'medium' | 'large'
}

const PrivacyContents: React.FC<Props> = ({ size = 'medium' }) => {
  let subTitleVariant: TypographyProps['variant'] = 'h6'
  let fontSize = 14

  if (size === 'small') {
    subTitleVariant = 'h6'
    fontSize = 12
  }

  if (size === 'large') {
    // TODO: subTitleVariant, fontsizeをセットする。
  }

  const classes = useStyles({ fontSize })

  return (
    <div>
      <div className={classes.columnWrapper}>
        <Typography className={classes.body}>
          Gorori合同会社（以下「当社」といいます）は、お客様よりお預かりした個人情報の保護に努めることを社会的責務として、今後も信頼いただける企業を目指すため、個人情報のお取り扱いに関する方針を定め、大切な個人情報の適正な管理と利用、保護に努めております。
          当社の提供するサービス「Nomoca（以下「本サービス」といいます）」における、お客様についての個人情報を含む利用者情報の取扱いについて、以下のとおり当社の個人情報保護方針に基づき本サービスのプライバシーポリシー（以下「本ポリシー」といいます）を定めます。
        </Typography>
        <div className={classes.divider} />
        <Typography className={classes.body}>
          当社の提供するサービス「Nomoca（以下「本サービス」といいます）」における、お客様についての個人情報を含む利用者情報の取扱いについて、本サービスのプライバシーポリシー（以下「本ポリシー」といいます）を定めます。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>個人情報の定義</Typography>
        </div>
        <Typography className={classes.body}>
          本ポリシーにおいて、個人情報とは、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により特定の個人を識別することができるもの（他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものを含みます）、又は個人識別符号が含まれるものを指します。
        </Typography>
        <div className={classes.divider} />
        <PinnedTypography pin="1." className={classes.body}>
          非個人情報
        </PinnedTypography>
        <div className={classes.divider} />
        <Typography className={classes.body}>
          非個人情報とは、ブラウザの種類、IPアドレス、当サイトに移動される前に訪れたウェブサイトのURLなど、利用者個人を特定できない情報です。当社は、利用者が本サービスをご利用になる際に一定の非個人情報を自動的に収集することがあります。
        </Typography>
        <div className={classes.divider} />
        <PinnedTypography pin="2." className={classes.body}>
          Facebook情報
        </PinnedTypography>
        <div className={classes.divider} />
        <Typography className={classes.body}>
          本サービスは、利用者が本サービスに登録または接続したときに、利用者のFacebookアカウントから自動的に個人情報を収集します。収集する個人情報に、Facebookのユーザーネーム、氏名、性別、年齢、メールアドレス、プロフィール写真、その他利用者が公開している情報（生年月日、居住地、血液型、趣味・関心、友達の情報など）があります。
          一度、本サービスにプロフィール情報を登録することで、今後他のデバイスからも本サービスを利用することができます。
          Facebookアカウントから自動的に収集する個人情報以外に、利用者がFacebookプロフィールから取り込むことを要求した情報のみが利用者の本サービスのプロフィールに反映されます。利用者は本サービスの設定画面にて、いつでもプロフィール情報を編集することができます。
        </Typography>
        <div className={classes.divider} />
        <PinnedTypography pin="3." className={classes.body}>
          Cookie（クッキー）
        </PinnedTypography>
        <div className={classes.divider} />
        <Typography className={classes.body}>
          当社は、利用者によりよいサービスを提供するため、Cookie
          （クッキー）を使用することがありますが、これにより個人を特定できる情報の収集を行うものではございません。また、Cookieの受け入れを希望されない場合は、ブラウザの設定で変更することができます。ただし、Cookieを無効化すると、本サービスの一部の機能をご利用いただけなくなる場合があります。
        </Typography>
        <div className={classes.divider} />
        <PinnedTypography pin="4." className={classes.body}>
          ログ
        </PinnedTypography>
        <div className={classes.divider} />
        <Typography className={classes.body}>
          利用者が本サービス利用時に自動で生成され、IPアドレス、ブラウザ種類、ブラウザ言語などが保存されます。これらの情報は利用者環境を分析し、より良いサービス提供のため、また正常なサービス提供を妨害する不正行為防止のために利用いたします。
        </Typography>
        <div className={classes.divider} />
        <PinnedTypography pin="4." className={classes.body}>
          端末固有識別番号
        </PinnedTypography>
        <div className={classes.divider} />
        <Typography className={classes.body}>
          本サービスはスマートフォン利用に際し、端末固有識別番号を取得いたします。端末固有識別番号は広告の配信のために利用いたします。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>個人情報の利用目的</Typography>
        </div>
        <Typography className={classes.body}>
          当社は本サービス内で会員登録やお問合せ受付等におきまして、上記で定義されます個人情報を取得いたします。
        </Typography>
        <div className={classes.divider} />
        <Typography className={classes.body}>
          当社は、あらかじめ利用者の同意を得ず、利用目的の達成に必要な範囲を超えて個人情報を取扱うことはありません。
          当社では、個人情報の利用に際しては、本ポリシー内または各サービスのウェブサイト内において、あらかじめ利用目的をできる限り特定した上で公表し、収集します。
          また、公表した利用目的にしたがって個人情報を取り扱います。当社で収集する個人情報の利用目的は以下の通りです。
        </Typography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          利用者が本サービスを円滑に利用できるようにするため
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          本サービス利用に関する統計データを作成するため
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          本サービスの企画立案検討、サービス改善にあたってのアンケート実施及び分析のため
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          利用者からのお問い合わせに対する対応のため
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          本サービスに関する情報等または当社以外の事業者が広告主となる広告情報等をメールマガジン等により告知するため
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          今後の本サービスに関する新企画立案を行い提供するため
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          キャンペーン等の抽選及び賞品発送のため
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          利用者からのお問い合わせ時など、本人確認を行うため
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          その他本サービスに関する重要なお知らせなど、必要に応じた連絡を行うため
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          利用者の年齢確認のため
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          Facebookアプリとの接続のため
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          有料サービスの利用者に利用料金を請求するため
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          マーケティングデータの調査、統計、分析のため
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          当社及び第三者の商品等の広告または宣伝（ダイレクトメールの送付、電子メールの送信、リマーケティング、リターゲティング広告を含む。）のため
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          イベント等の運営管理のため
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          利用者報告を本サービス内で紹介するため
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          サービス利用規約の遵守および禁止事項への抵触の有無を確認および監視するため
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          利用者のプロフィール、サービス内における活動、嗜好を分析し、他の利用者をお客様に飲み会相手として提案し、また、利用者を他の利用者に飲み会相手として提案するため
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          利用者が、そのプロフィールを他の利用者に閲覧可能とするため
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          尚、当社がサイトもしくはアプリ内で取得いたします個人情報は、他の情報源から得た情報で補足することがございます。
        </PinnedTypography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>個人情報利用目的の変更</Typography>
        </div>
        <Typography className={classes.body}>
          当社は、個人情報の利用目的を相当の関連性を有すると合理的に認められる範囲内において変更することがあり、変更した場合には利用者に通知または公表します。また、当初の目的以外の目的で使用する場合や、第三者に提供する場合は、事前に同意を取得の上行います。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>個人情報の利用制限</Typography>
        </div>
        <Typography className={classes.body}>
          当社は、あらかじめ特定し公表した利用目的の達成に必要な範囲内でのみお客様の個人情報を取り扱います。ただし、
          『電気通信事業における個人情報保護に関するガイドライン』第6条第3項にある以下の各号に該当する場合は、
          予め特定し公表した利用目的の達成に必要な範囲を超えてお客様の個人情報を取り扱うことがあります。
        </Typography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          法令に基づく場合
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
        </PinnedTypography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>個人情報の安全管理</Typography>
        </div>
        <Typography className={classes.body}>
          当社では、個人情報を取り扱う際に、個人情報の保護に関する法律その他個人情報保護に関する諸法令に関し、個人情報保護委員会および所管官庁が公表するガイドライン類に定められた義務、ならびに本ポリシーを遵守します。
          また、当社では、利用者よりお預かりした個人情報は、組織的、物理的、人的、技術的施策を講じることで個人情報への不正な侵入、個人情報の紛失、破壊、改ざん、及び漏えい等を防止いたします。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>従業者、委託先の監督</Typography>
        </div>
        <Typography className={classes.body}>
          個人情報の取り扱いに関する内部規程類を明確化し、また委託先とは機密保持契約の締結等を含め、適切に個人情報を取り扱うよう従業者、委託先を監督いたします。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>リンクについて</Typography>
        </div>
        <Typography className={classes.body}>
          本サービスにおいて、外部のサイトへのリンクが貼られることがあります。当社はリンク先のウェブサイトにおける個人情報の取り扱いについては責任を負いかねますので、各リンク先のサイトのご利用に際してはそれぞれのプライバシーポリシーを一読される事を推奨します。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>個人情報の適正な取得</Typography>
        </div>
        <Typography className={classes.body}>
          当社は、適正に個人情報を取得し、偽りその他不正の手段により取得することはありません。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>海外からのアクセスの場合</Typography>
        </div>
        <Typography className={classes.body}>
          日本国外からアクセスする利用者の個人情報および通信内容は、利用者の居住地域、国の外部にあるサーバーやデータベースに送受信、および保存されます。日本領土外に居住する利用者は、全ての情報が日本内で処理され保存されます。日本のプライバシー保護に関する法律は、利用者の国に比べて多少保護的でない可能性があります。本サービスの利用によって、利用者が個人情報と通信内容に対する収集、利用、譲渡、または公開に対して、日本の法律が適用される事実に同意したものと見なされます。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>個人情報の第三者への提供</Typography>
        </div>
        <Typography className={classes.body}>
          利用者よりお預かりした個人情報は、利用者本人の同意を得ずに第三者に提供することは、原則いたしません。ただし、以下の場合は関係法令に反しない範囲で、利用者本人の同意なく利用者の個人情報を提供することがあります。
        </Typography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          法令に基づく場合
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          ただし次に掲げる場合は上記に定める第三者には該当しません。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          当社が利用目的の達成に必要な範囲内において個人情報の取り扱いの全部または一部を委託する場合
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          合併その他の事由による事業の承継に伴って個人情報が提供される場合
        </PinnedTypography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第三者による個人情報の取得</Typography>
        </div>
        <Typography className={classes.body}>
          以下の場合は、第三者による個人情報の取得に関し、当社は何らの責任を負いかねます。
        </Typography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          利用者自らが、本サービス上の機能、または別の手段を用いて、他の利用者に個人情報を明らかにする場合
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          活動情報、またはその他の利用者が本サービス上に入力した情報により、期せずして本人が特定できてしまった場合
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="・" className={classes.body}>
          利用者ご本人以外の利用者が個人を識別できる情報（ユーザID、パスワード等）を入手した場合
        </PinnedTypography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第三者によるクッキー、Webビーコン等の使用について</Typography>
        </div>
        <Typography className={classes.body}>
          本サービスにおいて、効果的な広告配信や、利用状況測定等のためにも、第三者によるクッキー、Webビーコンその他の類似技術を使用する場合があります。設定によりクッキーの受入れを拒否することもできます。第三者によって取得されたクッキー情報は、第三者のプライバシーポリシーに従って取り扱われます。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>プライバシーポリシーの改定</Typography>
        </div>
        <Typography className={classes.body}>
          当社は、収集する個人情報の変更、利用目的の変更、またはその他プライバシーポリシーの変更を行う際は、本ページへの変更をもって公表とさせていただきます。変更後のプライバシーポリシーはサイト上に改定日を表示した時点より効力を生じます。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>個人情報の開示</Typography>
        </div>
        <Typography className={classes.body}>
          当社は、利用者から、個人情報保護法の定めに基づき個人情報の開示を求められたときは、利用者本人からのご請求であることを確認の上で、利用者に対し、遅滞なく開示を行います（当該個人情報が存在しないときにはその旨を通知いたします）。ただし、個人情報保護法その他の法令により、当社が開示の義務を負わない場合は、この限りではありません。
        </Typography>
        <div className={classes.divider} />
        <Typography className={classes.body}>
          なお、個人情報の開示につきましては、手数料（1件あたり2,000円）を頂戴しておりますので、あらかじめ御了承ください。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>個人情報の修正等</Typography>
        </div>
        <Typography className={classes.body}>
          当社は、利用者から、個人情報が真実でないという理由によって、個人情報保護法の定めに基づきその内容の訂正、追加または削除（以下「訂正等」といいます）を求められた場合には、利用者ご本人からのご請求であることを確認の上で、利用目的の達成に必要な範囲内において、遅滞なく必要な調査を行い、その結果に基づき、個人情報の内容の訂正等を行い、その旨を利用者に通知します（訂正等を行わない旨の決定をしたときは、利用者に対しその旨を通知いたします）。ただし、個人情報保護法その他の法令により、当社が訂正等の義務を負わない場合は、この限りではありません。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>個人情報の利用停止等</Typography>
        </div>
        <Typography className={classes.body}>
          当社は、利用者から、利用者の個人情報が、あらかじめ公表された利用目的の範囲を超えて取り扱われているという理由または偽りその他不正の手段により取得されたものであるという理由により、個人情報保護法の定めに基づきその利用の停止または消去（以下「利用停止等」といいます）を求められた場合において、そのご請求に理由があることが判明した場合には、利用者ご本人からのご請求であることを確認の上で、遅滞なく個人情報の利用停止等を行い、その旨をお客様に通知します。ただし、個人情報保護法その他の法令により、当社が利用停止等の義務を負わない場合は、この限りではありません。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>お問い合わせ窓口</Typography>
        </div>
        <Typography className={classes.body}>
          開示等のお申し出、ご意見、ご質問、苦情のお申し出その他個人情報の取扱いに関するお問い合わせは、下記の窓口までお願いいたします。
        </Typography>
        <div className={classes.divider} />
        <Typography className={classes.body}>〒XXX-XXXX</Typography>
        <Typography className={classes.body}>東京都XXX XXXX</Typography>
        <Typography className={classes.body}>Gorori合同会社</Typography>
        <Typography className={classes.body}>E-mail: kousaku.maron@gmail.com</Typography>
        <div className={classes.divider} />
        <Typography className={classes.body}>2020年XX月XX日制定・施行</Typography>
      </div>
    </div>
  )
}

const useStyles = ({ fontSize }: { fontSize: number }) =>
  makeStyles(() =>
    createStyles({
      body: {
        fontSize,
        fontWeight: 'lighter'
      },
      indentContainer: {
        paddingLeft: fontSize
      },
      columnWrapper: {
        paddingBottom: fontSize * 2
      },
      subTitleWrapper: {
        paddingBottom: fontSize
      },
      divider: {
        height: fontSize
      }
    })
  )()

export default PrivacyContents
