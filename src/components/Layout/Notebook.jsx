import Header from './Header';
import DateRow from './DateRow';
import DotGrid from '../Grid/DotGrid';
import TaskList from '../Tasks/TaskList';

const Notebook = () => {
  return (
    <div className="w-11/12 max-w-4xl bg-white rounded-2xl overflow-hidden shadow-md">
      <Header />
      <div className="p-5 flex flex-col">
        <DateRow />
        <div className="flex h-[500px] mt-5">
          <DotGrid />
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default Notebook;
