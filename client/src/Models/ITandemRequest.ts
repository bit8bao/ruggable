import LensTypeEnum from "../Constants/LensTypeEnum";

export default interface ITandemRequest {
    lensType: LensTypeEnum; // (string)[d1234, d4312; default: d1234]
}
