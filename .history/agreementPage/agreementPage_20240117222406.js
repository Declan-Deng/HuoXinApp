import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

export default function AgreementPage() {
  const handleAccept = () => {
    // 处理用户接受协议的逻辑
    console.log('用户接受了协议');
  };

  return (
    <View>
      <Text style={[styles.h2]}>协议声明</Text>
      <View style={styles.textContainer}>
        <ScrollView>
          <Text>
            <Text style={{fontWeight: 'bold'}}>AI心理检测应用用户协议</Text>
            {'\n'}1. 接受条款{'\n'}
            欢迎使用AI心理检测应用。在您注册成为本应用的用户前，请仔细阅读以下所有条款。使用本应用即表示您已阅读、理解并同意受本协议的约束。
            {'\n'}
            2. 服务描述{'\n'}
            AI心理检测应用（以下简称“本应用”）通过先进的人工智能技术提供心理健康评估服务。用户可以通过回答一系列问题，接收到基于AI分析的心理健康报告。
            {'\n'}
            3. 用户义务 {'\n'}
            用户应提供准确、真实的个人信息，并在信息变更时及时更新。{'\n'}
            用户应妥善保管账号信息，对账号下的所有活动负责。
            用户应遵守所有使用本应用的相关法律法规。{'\n'} 4. 知识产权 {'\n'}
            本应用的所有内容，包括但不限于文本、图像、代码等，均为本公司所有。未经本公司明确书面同意，用户不得复制、修改、传播或使用本应用的任何内容。
            {'\n'}
            5. 隐私保护 {'\n'}
            我们重视您的隐私保护。本应用会收集和使用您的个人信息，以提供服务和改进用户体验。具体信息收集和使用规则，请参阅《隐私政策》。
            用户提供的心理健康信息将受到严格保密，未经用户同意，不会向第三方披露。
            {'\n'}6. 免责声明 {'\n'}
            本应用提供的心理健康报告仅供参考，不能替代专业的医疗诊断或治疗意见。
            对于因用户提供不准确、不真实信息导致的服务不准确或损失，本应用不承担责任。
            {'\n'}7. 服务变更、中断或终止 {'\n'}
            本应用保留随时修改或中断服务而不需通知用户的权利。对于任何修改、暂停或终止服务的行为，本应用对用户或第三方不承担任何责任。
            如用户违反本协议任何条款，本应用有权随时终止对该用户的服务。 {'\n'}
            8.法律适用与争议解决{'\n'}
            本协议的订立、执行和解释及争议的解决均适用于中华人民共和国法律。如发生本协议相关的任何争议或纠纷，应友好协商解决，协商不成时，任一方均可向本应用运营方所在地的人民法院提起诉讼。
            {'\n'}9. 其他{'\n'}
            本应用保留随时更新和修改用户协议条款的权利。更新后的协议条款一经公布即代替原条款，恕不再另行通知。
            用户继续使用本应用服务将视为接受修改后的协议。
          </Text>
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAccept}>
        <Text style={styles.buttonText}>进入检测</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  h2: {
    color: 'black',
    fontSize: 53,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 90,
  },

  textContainer: {
    borderWidth: 1, // 边框宽度
    borderColor: '#ddd', // 边框颜色
    borderRadius: 10, // 边框圆角
    padding: 20,
    margin: 35, // 外边距
    marginHorizontal: 100, // 垂直外边距
    height: 300,
  },

  button: {
    backgroundColor: '',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center', // 垂直居中
    alignItems: 'center', // 水平居中
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
