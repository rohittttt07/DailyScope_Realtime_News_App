import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Spinner = () => {
  return (
    <div className="container">
      <div className="row">
        {[1,2,3,4,5,6,7,8].map((item)=>(
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={item}>
            <Skeleton height={220}/>
            <Skeleton height={25} className="mt-2"/>
            <Skeleton count={3}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Spinner;