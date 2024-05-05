import { ref } from "vue";

// 场景音乐
import LoginMusic from '../assets/mapMusic/login.MP3'
import WuDangMusic from '../assets/mapMusic/WuDang.MP3'
import ZhongYuan from '../assets/mapMusic/ZhongYuan.MP3'
import DiLao from '../assets/mapMusic/DiLao.MP3'

// 场景图片
import LoginBg from '../assets/img/map/LoginBg.png'
import WuDang from '../assets/img/map/WuDangBg.png'
import ZhongYuanBg from '../assets/img/map/ZhongYuanBg.png'
import DiLaoBg from '../assets/img/map/DiLaoBg.png'

export const musicSrc = ref("");
export const bgSrc = ref("")
export const musicBgConfig = ref({
    login: {
        musicSrc: LoginMusic,
        bgSrc: LoginBg
    },
    武当: {
        musicSrc: WuDangMusic,
        bgSrc: WuDang
    },
    中原: {
        musicSrc: ZhongYuan,
        bgSrc: ZhongYuanBg
    },
    地牢一层: {
        musicSrc: DiLao,
        bgSrc: DiLaoBg
    },
    地牢二层: {
        musicSrc: DiLao,
        bgSrc: DiLaoBg
    }
})
export const setMusicBg = (scene) => {
    musicSrc.value = musicBgConfig.value[scene].musicSrc
    bgSrc.value = musicBgConfig.value[scene].bgSrc
}
