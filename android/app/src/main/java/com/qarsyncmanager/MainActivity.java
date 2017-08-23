package com.qarsyncmanager;

import com.facebook.react.ReactActivity;
import com.aerofs.reactnativeautoupdater.ReactNativeAutoUpdater;
import com.aerofs.reactnativeautoupdater.ReactNativeAutoUpdater.ReactNativeAutoUpdaterUpdateType;
import com.aerofs.reactnativeautoupdater.ReactNativeAutoUpdater.ReactNativeAutoUpdaterFrequency;
import com.aerofs.reactnativeautoupdater.ReactNativeAutoUpdaterActivity;

public class MainActivity extends ReactNativeAutoUpdaterActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "QarSyncManager";
    }

    /**
    *  URL for the metadata of the update.
    * */
    @Override
    protected String getUpdateMetadataUrl() {
        return "http://qar-update-server.luch15.com/android/app/src/main/java/com/qarsyncmanager/metadata.android.json";
    }

    /**
    * Name of the metadata file shipped with the app.
    * This metadata is used to compare the shipped JS code against the updates.
    * */
    @Override
    protected String getMetadataAssetName() {
        return "metadata.android.json";
    }

    @Override
    protected String getHostnameForRelativeDownloadURLs() {
       return "http://qar-update-server.luch15.com";
    }
}
