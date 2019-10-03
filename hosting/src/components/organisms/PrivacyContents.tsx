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
