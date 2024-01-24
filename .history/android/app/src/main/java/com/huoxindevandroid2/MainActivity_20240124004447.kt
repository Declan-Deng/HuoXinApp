package com.huoxindevandroid2
import android.os.Bundle;
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.rn.full.screen.FullScreenModule; 


class MainActivity : ReactActivity() {

   override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }

 
  override fun getMainComponentName(): String = "HuoXinDevAndroid2"

  
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun getPackages(): List<ReactPackage> {
    return listOf(
        MainReactPackage(),
        FullScreenModule() // add this manager
    )
}


}
