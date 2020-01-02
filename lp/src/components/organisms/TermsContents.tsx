import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Typography, { TypographyProps } from '@material-ui/core/Typography'
import { PinnedTypography } from '../atoms'
import { getCompany, getAppInfo } from '../../repositories'

type Props = {
  size?: 'small' | 'medium' | 'large'
}

const company = getCompany()
const appInfo = getAppInfo()

const TermsContents: React.FC<Props> = ({ size = 'medium' }) => {
  let subTitleVariant: TypographyProps['variant'] = 'h6'
  let fontSize = 14

  if (size === 'small') {
    subTitleVariant = 'h6'
    fontSize = 14
  }

  if (size === 'large') {
    // TODO: subTitleVariant, fontsizeをセットする。
  }

  const classes = useStyles({ fontSize })

  return (
    <div>
      <div className={classes.columnWrapper}>
        <Typography className={classes.body}>
          この規約（以下「本規約」といいます）は、{company.name}（以下「当社」といいます）が提供する{appInfo.name}
          に関する全てのサービス（以下「本サービス」といいます）の利用に関する条件を、本サービスを利用するお客様（以下「利用者」といいます）と当社との間で定めるものです。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第1条　規約への同意</Typography>
        </div>
        <PinnedTypography pin="1." className={classes.body}>
          本サービスをご利用になる前に、本規約を良くお読みください。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="2." className={classes.body}>
          利用者は、本規約の定めに従って本サービスを利用しなければなりません。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="3." className={classes.body}>
          利用者は、Facebookアカウントにてログイン（以下「ログイン」といいます）をしないかぎり本サービスを利用できません。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="4." className={classes.body}>
          利用者はログインをするにあたり、本規約に同意して頂くことが必要であり、ログインした時点で、本規約を内容とする本サービス利用契約（以下「本契約」といいます）が当社との間で締結されます。
        </PinnedTypography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第2条　規約の適用</Typography>
        </div>
        <Typography className={classes.body}>
          本規約の規定が利用者との本規約に基づく契約に適用される関連法令に反するとされる場合、当該規定は、その限りにおいて、
          当該利用者との契約には適用されないものとします。但し、この場合でも、本規約の他の規定の効力には影響しないものとします。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第3条　本サービスの内容</Typography>
        </div>
        <Typography className={classes.body}>
          本サービスは、日本在住の男女を対象とした、 20歳以上の方の飲み会メンバー探しをサポートするサービスです。
          本サービスは、一部のサービスおよび機能を、無料でご利用いただけます。 飲み会メンバー探しのために、
          有料の機能をお使いいただくことをお勧めしています。なお、本サービスは飲み会メンバーを見つけることを保証するものではありません。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第4条　定義</Typography>
        </div>
        <Typography className={classes.body}>
          本サービス利用規約において、次の用語はそれぞれ以下のように定義します。
        </Typography>
        <div className={classes.divider} />
        <Typography className={classes.body}>
          「コンテンツ」本サービスを通じて利用者が入力した、プロフィール、メッセージなどの一切の情報。
          「利用者」当社が定めた本サービスの登録手続きに従い、本規約に対し同意の上、本サービスの会員登録を完了し、本サービスを利用する資格を持つ個人をいいます。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第5条　本サービスの提供、無保証、変更および中止</Typography>
        </div>
        <PinnedTypography pin="1." className={classes.body}>
          当社は、本サービスの提供を受けることができる利用者を、会員登録の有無、年齢、その他、
          当社が必要と判断する条件を満たしたお客様に限定することができるものとします。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="2." className={classes.body}>
          当社は、当社が必要と判断する場合、
          あらかじめ利用者に通知することなく、いつでも、本サービスの全部または一部の内容を変更し、また、その提供を中止することができるものとします。
          当社は、本規定に基づき当社が行った措置によって利用者に生じた損害について一切の責任を負いません。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="3." className={classes.body}>
          当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、
          正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、
          権利侵害などを含みますが、これらに限りません）がないことを保証しておりません。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="4." className={classes.body}>
          当社は、本サービスが、全てのパソコン、スマートフォン、タブレット端末等およびOSに対応することを保証しておりません。また、当社は、利用者の環境により本サービスを利用できなかったことに基づき利用者に生じた損害について、一切の責任を負いません。
        </PinnedTypography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第6条　利用資格</Typography>
        </div>
        <PinnedTypography pin="1." className={classes.body}>
          20歳以上のみが利用可能なサービスです。年齢の判断は、当社が会員登録時のFacebookに登録された生年月日、本人の自己申告等を元に合理的な範囲で行うものであり、全ての本サービスの会員が常時20歳以上であることを当社が保証するものではありません。登録後に違反が発見された場合、当社判断で会員登録を無効とさせていただきます。当社は、無効とする措置により利用者に発生した損害について一切の責任を負わないものとします。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="2." className={classes.body}>
          利用者は、本サービスをご利用になることによって、本契約に参加し本契約の規約と条件の全てに従う権利、権限、義務および能力を有すると表明し、保証するとみなされます。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="3." className={classes.body}>
          本サービスは、現在会員の犯罪経歴調査は行っておらず、会員の経歴も問い合わせず、会員の申告も確認は行っていないため、他の利用者について、この点を当社が保証するものではない点をご理解してください。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="4." className={classes.body}>
          当社は、利用者について、いずれかの犯罪経歴調査や他の審査（例：性的犯罪者登録検索）を、いつでも、利用可能な公的記録を使用して、行うことができるものとしますが、これを行う義務を負うものではありません。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="5." className={classes.body}>
          本サービスは、現在または今後の会員の行為や整合性に関して、保証しておりません。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="6." className={classes.body}>
          当社は、利用者が下記の事由に相当する場合は、会員登録の拒否を行うことが出来るものとします。
        </PinnedTypography>
        <div className={classes.divider} />
        <div className={classes.indentContainer}>
          <PinnedTypography pin="・" className={classes.body}>
            本規約に違反するおそれがあると当社が判断した場合
          </PinnedTypography>
          <div className={classes.divider} />
          <PinnedTypography pin="・" className={classes.body}>
            当社に提供された登録情報の全部又は一部につき虚偽、誤記又は記載漏れがあった場合
          </PinnedTypography>
          <div className={classes.divider} />
          <PinnedTypography pin="・" className={classes.body}>
            過去に本サービスの利用の登録を取り消された者である場合
          </PinnedTypography>
          <div className={classes.divider} />
          <PinnedTypography pin="・" className={classes.body}>
            成年被後見人、被保佐人、又は被補助人のいずれかであり、法定代理人、後見人、保佐人又は補助人の同意等を得ていなかった場合
          </PinnedTypography>
          <div className={classes.divider} />
          <PinnedTypography pin="・" className={classes.body}>
            反社会的勢力等（暴力団、暴力団体、右翼団体、反社会的勢力、その他これに準ずる者を意味します。以下同じ。）である、又は資金提供その他を通じて反社会的勢力等の維持、運営若しくは経営に協力若しくは関与する等反社会的勢力等との何らかの交流若しくは関与を行っていると当社が判断した場合
          </PinnedTypography>
          <div className={classes.divider} />
          <PinnedTypography pin="・" className={classes.body}>
            その他、当社が登録を適当でないと判断した場合
          </PinnedTypography>
        </div>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第7条　利用者の責任および注意義務</Typography>
        </div>
        <PinnedTypography pin="1." className={classes.body}>
          利用者は、自己の責任に基づき本サービスを利用するものとし、利用者が公開するコンテンツについて、全て自己で責任を負うものとします。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="2." className={classes.body}>
          利用者は、本サービスをご利用になることによって、本契約に参加し本契約の規約と条件の全てに従う権利、権限、義務および能力を有すると表明し、保証するとみなされます。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="3." className={classes.body}>
          本サービスは、現在会員の犯罪経歴調査は行っておらず、会員の経歴も問い合わせず、会員の申告も確認は行っていないため、他の利用者について、この点を当社が保証するものではない点をご理解してください。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="4." className={classes.body}>
          当社は、利用者について、いずれかの犯罪経歴調査や他の審査（例：性的犯罪者登録検索）を、いつでも、利用可能な公的記録を使用して、行うことができるものとしますが、これを行う義務を負うものではありません。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="5." className={classes.body}>
          本サービスは、現在または今後の会員の行為や整合性に関して、保証しておりません。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="6." className={classes.body}>
          当社は、利用者が下記の事由に相当する場合は、会員登録の拒否を行うことが出来るものとします。
        </PinnedTypography>
        <div className={classes.divider} />
        <div className={classes.indentContainer}>
          <PinnedTypography pin="・" className={classes.body}>
            本規約に違反するおそれがあると当社が判断した場合
          </PinnedTypography>
          <div className={classes.divider} />
          <PinnedTypography pin="・" className={classes.body}>
            当社に提供された登録情報の全部又は一部につき虚偽、誤記又は記載漏れがあった場合
          </PinnedTypography>
          <div className={classes.divider} />
          <PinnedTypography pin="・" className={classes.body}>
            過去に本サービスの利用の登録を取り消された者である場合
          </PinnedTypography>
          <div className={classes.divider} />
          <PinnedTypography pin="・" className={classes.body}>
            成年被後見人、被保佐人、又は被補助人のいずれかであり、法定代理人、後見人、保佐人又は補助人の同意等を得ていなかった場合
          </PinnedTypography>
          <div className={classes.divider} />
          <PinnedTypography pin="・" className={classes.body}>
            反社会的勢力等（暴力団、暴力団体、右翼団体、反社会的勢力、その他これに準ずる者を意味します。以下同じ。）である、又は資金提供その他を通じて反社会的勢力等の維持、運営若しくは経営に協力若しくは関与する等反社会的勢力等との何らかの交流若しくは関与を行っていると当社が判断した場合
          </PinnedTypography>
          <div className={classes.divider} />
          <PinnedTypography pin="・" className={classes.body}>
            その他、当社が登録を適当でないと判断した場合
          </PinnedTypography>
        </div>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第8条　禁止事項</Typography>
        </div>
        <Typography className={classes.body}>
          利用者は、本サービスの利用に際して、以下の行為を行ってはならないものとします。利用者がこれらの禁止行為を行った、又は行うおそれがあると当社が判断した場合、利用者に通知することなく、当社は該当する内容のデータの削除、当該利用者に対して注意を促す表示を行う、または利用制限もしくは強制退会させることができるものとします。ただし、当社は、当該データ等を掲載停止または削除する義務を負うものではなく、データの削除および利用制限等の処分につきまして当社は説明の義務を負わないものとします。なお、当社は、本条に基づき当社が行った措置に基づき利用者に生じた損害について一切の責任を負いません。
        </Typography>
        <div className={classes.divider} />
        <PinnedTypography pin="1." pinSize={24} className={classes.body}>
          会員のアイコン画像、サブ写真を含む、本サービス上の画像を当社の承諾なくキャプチャーその他の方法により複製、利用又は公開する行為
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="2." pinSize={24} className={classes.body}>
          本規約に反する行為
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="3." pinSize={24} className={classes.body}>
          日本国またはご利用の際に利用者が所在する国・地域の法令に違反する行為
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="4." pinSize={24} className={classes.body}>
          社会規範・公序良俗に反するものや、他人の権利を侵害し、または他人の迷惑となるようなものを、投稿、掲載、開示、提供または送信（以下これらを総称して「投稿など」といいます）したりする行為
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="5." pinSize={24} className={classes.body}>
          利用者以外の自然人・法人・団体・組織等の第三者（以下、「第三者」といいます）に自己の{appInfo.name}
          アカウントを譲渡して、本サービスを利用させる行為
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="6." pinSize={24} className={classes.body}>
          第三者に自己の{appInfo.name}アカウントのログインに必要な情報を閲覧可能な状態にしておく行為
        </PinnedTypography>
        <div className={classes.divider} />

        <PinnedTypography pin="7." pinSize={24} className={classes.body}>
          本サービスに関連して、反社会的勢力に直接・間接に利益を提供する行為
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="8." pinSize={24} className={classes.body}>
          本サービスを、提供の趣旨に照らして本来のサービス提供の目的とは異なる目的で利用する行為
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="9." pinSize={24} className={classes.body}>
          第三者の個人情報を公開する行為
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="10." pinSize={24} className={classes.body}>
          20歳未満の会員登録および本サービスの利用
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="11." pinSize={24} className={classes.body}>
          児童を騙る行為
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="12." pinSize={24} className={classes.body}>
          性描写、残酷な表現、犯罪を誘発する表現、差別表現など、公序良俗に反する行為やコンテンツ閲覧者
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="13." pinSize={24} className={classes.body}>
          第三者に成りすます行為
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="14." pinSize={24} className={classes.body}>
          虚偽の情報をコンテンツに掲載し、コンテンツ閲覧者を欺く行為
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="15." pinSize={24} className={classes.body}>
          第三者の名誉や社会的信用を毀損したり、不快感や精神的な損害を与える行為
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="16." pinSize={24} className={classes.body}>
          選挙運動、またはこれらに類似する行為および公職選挙法に抵触する行為
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="17." pinSize={24} className={classes.body}>
          コンテンツ閲覧者を含む利用者以外の自然人・法人・団体・組織等の第三者の個人情報の収集を行う行為
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="18." pinSize={24} className={classes.body}>
          第三者の所有する知的所有権を侵害する行為や、著作権、肖像権の侵害を誘発する行為
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="19." pinSize={24} className={classes.body}>
          当社が許可した場合を除く、本サービス上の文字、画像、会員のニックネーム、アイコン画像、プロフィール情報、その他の会員の情報を無断で使用する行為（モザイク処理をしても、当社が許可をしていない場合は無断使用と見なします）
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="20." pinSize={24} className={classes.body}>
          本サービスの運営を妨げる行為
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="21." pinSize={24} className={classes.body}>
          当社が、本サービスの運営を妨げるおそれがあると判断する量のデータ転送、サーバーに負担をかける行為（不正な連続アクセスなど）
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="22." pinSize={24} className={classes.body}>
          商用目的の宣伝・広告行為（例：アダルト関連サービスへの誘導を目的として特定または不特定多数の利用者にメッセージ機能などの方法で送信したりする行為）
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="23." pinSize={24} className={classes.body}>
          有害なコンピュータウィルス、コード、ファイル、プログラム等を開示する行為、もしくは開示されている場所について示唆する行為
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="24." pinSize={24} className={classes.body}>
          無限連鎖講およびマルチ商法、またはそれに類するもの、その恐れのあるもの、あるいは当社が無限連鎖講およびマルチ商法、またはそれに類するもの、その恐れのあるものと判断する内容を掲載する行為
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="25." pinSize={24} className={classes.body}>
          児童ポルノ、またはそれに類する内容、あるいは当社が児童ポルノに類すると判断する内容を掲載する行為
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="26." pinSize={24} className={classes.body}>
          性器露出画像、動画、あるいは性器を描写したデータ等、当社が性器を描写した内容であると判断した内容のサイトへのリンクを掲載する行為
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="27." pinSize={24} className={classes.body}>
          次のようなコンテンツを投稿などすること
        </PinnedTypography>
        <div className={classes.divider} />
        <div className={classes.indentContainer}>
          <PinnedTypography pin="・" className={classes.body}>
            許可を得ないで第三者のプロフィールや写真を使用したコンテンツ
          </PinnedTypography>
          <div className={classes.divider} />
          <PinnedTypography pin="・" className={classes.body}>
            集団および個人に対するあらゆる種類の人種差別や偏見、憎悪、身体的危害を助長するコンテンツのような、
            オンラインコミュニティーに対して明らかに不快だと思われるコンテンツ
          </PinnedTypography>
          <div className={classes.divider} />
          <PinnedTypography pin="・" className={classes.body}>
            他人への嫌がらせのコンテンツ、または嫌がらせを支持するコンテンツ
          </PinnedTypography>
          <div className={classes.divider} />
          <PinnedTypography pin="・" className={classes.body}>
            嘘であることや誤解を招くということを利用者がわかっている情報を広めるコンテンツや、違法行為を助長するコンテンツ、または罵倒、脅迫、わいせつ、名誉棄損、文書による名誉棄損に当たるような行為を助長するコンテンツ
          </PinnedTypography>
          <div className={classes.divider} />
          <PinnedTypography pin="・" className={classes.body}>
            ｢ジャンクメール｣、｢チェーンメール｣、迷惑メール、｢スパム｣などの送信に関連するコンテンツ
          </PinnedTypography>
          <div className={classes.divider} />
          <PinnedTypography pin="・" className={classes.body}>
            海賊版コンピュータ･プログラムを提供したり、それにリンクを張ったり、製品に組み込まれたコピー防止機能を回避する情報を提供したり、海賊版音楽を提供したり、海賊版音楽ファイルにリンクを張ったりするなどして、他人の著作権によって保護された作品を違法または不正にコピーすることを助長するコンテンツ
          </PinnedTypography>
          <div className={classes.divider} />
          <PinnedTypography pin="・" className={classes.body}>
            性的または暴力的な手法で20歳未満の人を不当に利用するコンテンツ。または、20歳未満の人から個人情報を求める構成要素を提供するコンテンツ
          </PinnedTypography>
          <div className={classes.divider} />
          <PinnedTypography pin="・" className={classes.body}>
            営利的または違法な目的のために、他の利用者からパスワードや個人情報を求めるコンテンツ
          </PinnedTypography>
          <div className={classes.divider} />
          <PinnedTypography pin="・" className={classes.body}>
            違法な武器の製造、購入や、他人のプライバシーの侵害、コンピュータウィルスの製造など、違法行為に関する説明を提供するコンテンツ
          </PinnedTypography>
          <div className={classes.divider} />
          <PinnedTypography pin="・" className={classes.body}>
            公開されていないページや、パスワードがないとアクセスできないページを含んだコンテンツ
          </PinnedTypography>
          <div className={classes.divider} />
          <PinnedTypography pin="・" className={classes.body}>
            コンテスト、宝くじ、物々交換、宣伝、ネズミ講など、当社から事前に書面で許可を得ないで、営利的活動または販売を行うコンテンツ
          </PinnedTypography>
          <div className={classes.divider} />
        </div>
        <div className={classes.divider} />
        <PinnedTypography pin="28." pinSize={24} className={classes.body}>
          Facebookの利用規約に反する行為
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="29." pinSize={24} className={classes.body}>
          その他当社が不適切であると判断する行為
        </PinnedTypography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第9条　本サービスの利用制限</Typography>
        </div>
        <Typography className={classes.body}>
          当社は、本サービス以外での利用者の行為を監視することができませんが、本サービスから得た情報を、他人に対する嫌がらせや罵倒、危害を加える目的で使用したり、事前に明示的な同意を相手から得ずに他の会員に連絡、宣伝、勧誘、販売したりすることも、本規約に対する違反になります。そのような宣伝や勧誘から当社の会員を守るために、利用者が他の会員に24時間以内に送ることができるメールの数を、当社の妥当な判断で適切な数に制限する権利を当社は有します。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第10条　契約期間および契約の終了</Typography>
        </div>
        <PinnedTypography pin="1." className={classes.body}>
          利用者が本サービスの会員である限り、本契約は有効です。会員になって本サービスに参加することを利用者が選ばれた場合は、本サービスを即座に開始することを利用者が選ばれたことになり、クーリングオフは認められません。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="2." className={classes.body}>
          利用者は本サービスの退会申請フォームから契約終了の通知を当社にお送りいただくことで、いつでもいかなる理由でも、利用者は会員資格を終了させることができます。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="3." className={classes.body}>
          利用者が本契約の一つ以上の条項に違反した場合、また、そのおそれがあると当社が判断した場合、当社はいつでも利用者の会員資格を即座に終了させ、禁止するコンテンツを削除し、本サービスの利用を終了させることができます。さらに、利用者が本サービスの全部または一部にアクセスすることを、恒久的または一時的に当社は禁止することができます。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="4." className={classes.body}>
          会員登録が取り消しとなった場合、利用者が退会した場合、その他の理由により利用者が会員資格を失った場合、有料サービスについて利用者が購入されたチケットが使用されていなくても、一切、返金は致しかねます。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="5." className={classes.body}>
          利用者は、（本サービスに最後に接続した日から数えて）6ヵ月以上本サービスを利用しなかった会員のアカウントを、本サービスは無効にすることができます｡
        </PinnedTypography>
        <div className={classes.divider} />
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第11条　再利用の禁止</Typography>
        </div>
        <Typography className={classes.body}>
          利用者が、当社のサービスやそれらを構成するデータを、本サービスの提供目的を超えて利用した場合、当社は、それらの行為を差し止める権利ならびにそれらの行為によって利用者が得た利益相当額を請求する権利を有します。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第12条　利用料金</Typography>
        </div>
        <Typography className={classes.body}>
          本サービスは、一部のサービスおよび機能を、無料でご利用いただけます。追加機能を利用するには、有料サービスを購入する必要があります。なお、購入後の変更・キャンセルはお受けできませんのでご了承ください。
          また、お客様が申し込まれた有料サービスを利用期間の途中で利用休止またはご解約（解約は退会フォームからお願いいたします）された場合も、返金や有料サービスの精算は一切行っておりませんのでご注意ください。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>
            第13条　投稿などの削除、サービスの利用停止、アカウント削除について
          </Typography>
        </div>
        <Typography className={classes.body}>
          利用者が本サービスに投稿などしたコンテンツと、本サービスを通してお客様が他の会員に転送したコンテンツについて、お客様は単独で責任を負います。利用者が投稿した場合はいつでも、そのコンテンツが（a）正確かつ（b）本契約に違反せず、かつ（c）あらゆる点で誰にも害が及ばないことを、お客様は表明し保証したことになります｡
        </Typography>
        <div className={classes.divider} />
        <Typography className={classes.body}>
          当社は、提供するサービスを適正に運営するために、以下の場合にはあらかじめ通知することなく、データやコンテンツを削除したり、サービスの全部または一部の利用をお断りしたり、利用者のアカウントを削除したりするといった措置を講じることができるものとします。
        </Typography>
        <div className={classes.divider} />
        <PinnedTypography pin="1." className={classes.body}>
          利用者が本規約に定められている事項に違反した場合、もしくはそのおそれがあると当社が判断した場合
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="2." className={classes.body}>
          当社にお支払いいただく代金について支払の遅滞が生じた場合
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="3." className={classes.body}>
          本サービスの代金決済手段として指定されたクレジットカードや銀行口座の利用が停止された場合
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="4." className={classes.body}>
          利用者が破産もしくは民事再生の手続の申立てを受け、または利用者自らがそれらの申立てを行うなど、利用者の信用不安が発生したと当社が判断した場合
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="5." className={classes.body}>
          アカウントが反社会的勢力またはその構成員や関係者によって登録または使用された場合、もしくはそのおそれがあると当社が判断した場合
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="6." className={classes.body}>
          利用者が一定期間にわたってアカウントまたは特定のサービスを使用していない場合
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="7." className={classes.body}>
          その他、利用者との信頼関係が失われた場合など、当社と利用者との契約関係の維持が困難であると当社が判断した場合
        </PinnedTypography>
        <div className={classes.divider} />
        <Typography className={classes.body}>
          また、本サービス上での利用者間のメッセージのやりとりは、当社の管理する電子掲示板を通じて提供されます。
          電子掲示板は、当該メッセージのやりとりをされる利用者同士と当社の三者が閲覧できる仕様となっております。
          利用者は、当社が事故防止ならびに健全なサービスを運営する目的で、メッセージの内容を閲覧、削除することに同意するものとします。
          但し、当社として電子掲示板を巡回・監視する義務を負うものではありません。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第14条　当社に対する補償</Typography>
        </div>
        <Typography className={classes.body}>
          利用者は、利用者が法令または本規約に違反して本サービスを利用したことに起因して（かかる趣旨のクレームを第三者より当社が受けた場合を含みます）、当社が直接的もしくは間接的に何らかの損害、損失または費用負担（弁護士費用の負担を含みます）を被った場合、当社の請求にしたがって直ちにこれを賠償または補償しなければなりません。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第15条　利用者のデータおよびコンテンツの取扱い</Typography>
        </div>
        <Typography className={classes.body}>
          当社の本サービスの保守や改良などの必要が生じた場合には、当社は利用者が当社の管理するサーバーに保存しているデータを、本サービスの保守や改良などに必要な範囲で複製等することができるものとします。
        </Typography>
        <div className={classes.divider} />
        <Typography className={classes.body}>
          利用者が投稿などをしたコンテンツ（位置情報、画像データ、テキストを含みますが、これらに限られません。以下「投稿コンテンツ」といいます）については、利用者または当該投稿コンテンツの著作権者に著作権が帰属します。投稿コンテンツについて、利用者は当社に対して、日本の国内外で無償かつ非独占的に利用（複製、上映、公衆送信、展示、頒布、譲渡、貸与、翻訳、翻案、出版を含みます）する権利を期限の定めなく許諾（サブライセンス権を含みます）したものとみなします。ただし、利用者間のメッセージ内容についてはプライバシーを尊重し、本条の許諾対象には含まないものとします。なお、利用者は著作者人格権を行使しないものとします。
        </Typography>
        <div className={classes.divider} />
        <Typography className={classes.body}>
          利用者が本サービスを利用して生成した投稿コンテンツについての著作権を除き、本サービスおよび本サービスに関連する一切の情報についての著作権およびその他知的財産権はすべて当社または当社がその利用を許諾した権利者に帰属し、利用者は無断で複製、譲渡、貸与、翻訳、改変、転載、公衆送信（送信可能化を含みます）、伝送、配布、出版、営業使用等をしてはならないものとします。
        </Typography>
        <div className={classes.divider} />
        <Typography className={classes.body}>
          当社は、投稿コンテンツの利用を、利用者自身を除く、他の利用者その他の第三者に許諾するものではなく、利用者は他の利用者の投稿コンテンツの権利を侵害する行為を行ってはならないものとします。また、利用者は投稿コンテンツをクロール等で自動的に収集、解析する行為も行ってはならないものとします。{' '}
        </Typography>
        <div className={classes.divider} />
        <Typography className={classes.body}>
          当社は、他の利用者の投稿コンテンツを利用したことによって利用者に生じた損害について、一切の保証をいたしません。また、利用者が他の利用者の投稿コンテンツを利用して利益を得た場合には、当社はその利益相当額の金員を請求できる権利を有するものとします。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第16条　連絡または通知</Typography>
        </div>
        <PinnedTypography pin="1." className={classes.body}>
          利用者は、本利用規約に別段の定めがある場合を除き、当社への連絡はお問い合わせフォームから行うものとします。当社は電話による連絡および来訪は受け付けておりません。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="2." className={classes.body}>
          利用者への連絡または通知の必要があると当社が判断した場合には、Facebookに登録されたメールアドレス宛もしくはショートメッセージにてメールにて連絡または通知を行います。ただし、利用者から正確な連絡先の提供がなされていない場合の不利益に関しては、当社は一切責任を負いません。
        </PinnedTypography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第17条　権利義務などの譲渡</Typography>
        </div>
        <Typography className={classes.body}>
          利用者は、本規約に基づくすべての契約について、その契約上の地位およびこれにより生じる権利義務の全部または一部を、第三者に譲渡または貸与することはできません。
        </Typography>
        <div className={classes.divider} />
        <Typography className={classes.body}>
          当社は本サービスにかかる事業を他社に譲渡した場合には、当該事業譲渡に伴い利用契約上の地位、本規約に基づく権利及び義務並びに利用者の登録情報その他の顧客情報を当該事業譲渡の譲受人に譲渡することができるものとし、利用者は、かかる譲渡につき本項において予め同意したものとします。なお、本項に定める事業譲渡には、通常の事業譲渡のみならず、会社分割その他事業が移転するあらゆる場合を含むものとします。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第18条　会員間の紛争</Typography>
        </div>
        <Typography className={classes.body}>
          利用者は、自己の責任に基づき本サービスを利用するものとし、本サービスの他の会員との交流に関しては、単独で責任を負うものとします。当社は、利用者と他の会員との間で起きた紛争を監視する権利を留保しますが、義務はありません。
        </Typography>
      </div>
      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第19条　プライバシー</Typography>
        </div>
        <Typography className={classes.body}>
          本サービスの使用には、当社のプライバシーポリシーも適用されます。会員が当社に提供した（機密性の高い個人情報も含む）個人情報は、当社のコンピュータに保存されます。
          興味や好み、閲覧のパターンについてのプロフィールを作成し、会員が本サービスに参加できるようにするために、当社がこの情報を利用することに、会員は同意するものとします｡
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第20条　Facebookとの関係</Typography>
        </div>
        <PinnedTypography pin="1." className={classes.body}>
          当社は、利用者がFacebookの利用規約およびプライバシーポリシーに従わなかったことによる違反の結果、Facebookを通じて本サービスを利用できなくなってしまっても、責任を負わないものとします。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="2." className={classes.body}>
          当社は、いかなる理由でもFacebookのアカウントを中断、遮断、閉鎖、または終了されたことにより、本サービスを利用できなくなってしまっても、責任を負わないものとします。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="3." className={classes.body}>
          Facebookを利用して本サービスのアカウントを作成している場合であって、Facebookの退会その他の理由により利用者がFacebookを利用できなくなった場合には本サービスも利用できなくなります。この場合、利用者は、自己の責任で、第10条第2項の規定に従って本サービスの退会手続きをするものとし、当該手続きを行わなかったことにより利用料金が発生した場合でも、当社は一切の責任を負いません。
        </PinnedTypography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第21条　児童を誘引する行為の規制</Typography>
        </div>
        <Typography className={classes.body}>本サービスでは、児童を誘引する行為の規制を行っております。</Typography>
        <div className={classes.divider} />
        <Typography>
          この目的は、「本サービス利用に起因する児童買春その他の犯罪から児童を保護し、もって児童の健全な育成に資すること」です。
          このような目的を実現するため、本サービスではサービス利用に当たって男女共に身分証明書など予め定められた方法による年齢確認を行っております。
        </Typography>
        <div className={classes.divider} />
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第22条　免責事項</Typography>
        </div>
        <Typography className={classes.body}>
          当社の債務不履行責任は、当社の故意または重過失によらない場合には免責されるものとします。
        </Typography>
        <div className={classes.divider} />
        <Typography className={classes.body}>
          なお、お客様との本規約に基づく当社のサービスのご利用に関する契約が消費者契約法に定める消費者契約に該当する場合、上記の免責は適用されないものとし、当社は、当社の故意・重過失に起因する場合を除き、通常生じうる損害の範囲内で、かつ、有料サービスにおいては代金額（継続的なサービスの場合は1か月分相当額）を上限として損害賠償責任を負うものとします。
        </Typography>
        <div className={classes.divider} />
        <Typography className={classes.body}>
          本サービスの構成要素は、あらゆる種類の条件、保証、またはその他の契約条件なしに、無保証で提供されます。したがって、この法的通知がなければ本サービスとの関係で効力を持った可能性のあるすべての説明、保証、条件、またはその他の契約条件（満足のゆく品質、目的適合性、合理的な配慮と技術の行使など、法によって暗示されている条件を含みますが、これに限られません）を法によって認められている最大限度まで本サービスは排除するという前提で、当社は本サービスをお客様に提供します。
        </Typography>
        <div className={classes.divider} />
        <Typography className={classes.body}>
          当社や当社のパートナー企業、会員やその他の個人または団体が、本サービスを通じて表示し、アップロードし、または配布する助言、意見、声明やその他の情報について、当社はその正確さや信頼性を表明し保証するものではありません。以上のような意見、会員プロフィール、助言、声明や情報を信頼することについては、お客様の自己責任になることをお客様は承認するものとします。オンラインでもオフラインでも、会員の行動について当社は責任を負いません。本サービスを利用される際は、注意をして常識を働かせてください。適用法令の下で排除することが不可能な強行法規の権利（消費者としてのお客様の実定法上の権利を含みます）を、この法的通知および以上の免責事項は排除するものではありません。
        </Typography>
        <div className={classes.divider} />
        <Typography className={classes.body}>
          本サービスは、日本国内においてのみ使用されることを想定しており、当社は、日本国外において本サービスの利用ができることを保証しないものとします。また、当社は、日本国外における本サービスの利用について、一切のサポートを提供する義務を負わないものとします。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第23条　本サービスのご利用上の注意</Typography>
        </div>
        <PinnedTypography pin="1." className={classes.body}>
          本サービスは、飲み会メンバーを探している20歳以上の方に対して、飲み会メンバー探しをサポートするサービスですが、
          不特定多数の方がご利用になっているため、場合によっては本サービスを悪用されたりする可能性があります。そのような可能性があることをご認識のうえ、
          他の会員（特にメッセージのやり取りを行う他の会員）に対してのやりとり方法、個人情報の開示に関しては、慎重に考えて、本サービスをご利用ください。また、やり取りをしている会員が20歳以上か否かは初回登録時のFacebookの情報およびご本人の自己申告による情報等を元に当社が合理的な範囲で判断しております。そのため、全ての会員様が20歳以上であることを保証するものではございません。他の会員に対して本サービス以外でのやりとり手段の提供、個人情報等重要な情報の開示を行う場合は、慎重に検討し自己の責任のうえで行うようにしてください。規約違反の疑いがある会員を発見した場合は、すみやかに違反報告ボタン、またはお問い合せより違反内容をご報告ください。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="2." className={classes.body}>
          利用者は、自らの責任によりFacebookの設定を行うものとします。利用者は、Facebookの設定に関する当社の指示に従わなかった場合には、不利益が生ずる可能性があることに予め同意するものとします。当社は、利用者が行ったFacebookの設定に起因して利用者に発生した損害について一切の責任を負わないものとします。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="3." className={classes.body}>
          利用者は、当社がFacebookのバグ、不具合、瑕疵等について一切の責任を負わないことに予め同意するものとします。
        </PinnedTypography>
        <div className={classes.divider} />
        <PinnedTypography pin="4." className={classes.body}>
          利用者は、Facebookの仕様、サービス内容その他の事項が変更されることにより、本サービスの内容や機能が変更される場合があることに予め同意するものとします。当社は、かかる変更により利用者に発生した損害について一切の責任を負わないものとします。
        </PinnedTypography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第24条　本サービス及び利用規約の変更について</Typography>
        </div>
        <Typography className={classes.body}>
          当社が必要と判断した場合には、利用者の事前の承諾を得ることなく、本規約をいつでも変更することができるものとします。なお、改定に際しては随時、利用者に告知するものとします。本規約変更後に、利用者が本サービスをご利用される場合には、変更後の本規約の内容を承諾したものとみなします。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第25条　準拠法</Typography>
        </div>
        <Typography className={classes.body}>本規約は、日本法に準拠し、解釈されるものとします。</Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第26条　管轄裁判所</Typography>
        </div>
        <Typography className={classes.body}>
          利用者と当社との間で訴訟の必要が生じた場合、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
        </Typography>
      </div>

      <div className={classes.columnWrapper}>
        <div className={classes.subTitleWrapper}>
          <Typography variant={subTitleVariant}>第27条　附則</Typography>
        </div>
        <Typography className={classes.body}>
          {company.privacyEstablishedAt.getFullYear()}年{company.privacyEstablishedAt.getMonth() + 1}月
          {company.privacyEstablishedAt.getDate()}日 制定・施行
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

export default TermsContents
