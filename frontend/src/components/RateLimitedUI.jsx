
import { ShieldAlert, Timer } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <dialog className="modal modal-open">
      <div className="modal-box text-center border border-base-content/10">
        
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-error/20 blur-xl rounded-full"></div>
            <div className="bg-error/10 p-4 rounded-full relative ring-1 ring-error/20">
              <ShieldAlert className="size-12 text-error" />
            </div>
          </div>
        </div>

        <h3 className="font-bold text-2xl mb-2">Rate Limit Exceeded</h3>
        
        <p className="py-2 text-base-content/70">
          Whoa there! You've made too many requests in a short period. 
          Please take a breather and try again in a moment.
        </p>

        <div className="w-full bg-base-200 rounded-lg p-3 flex items-center justify-center gap-2 my-4 text-sm text-base-content/80">
          <Timer className="size-4" />
          <span>Resets in approx. 15 minutes</span>
        </div>

        <div className="modal-action justify-center">
          <button 
            className="btn btn-primary w-full"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      </div>
      
      {/* Backdrop to cover the screen */}
      <form method="dialog" className="modal-backdrop bg-black/50 backdrop-blur-sm">
        <button className="cursor-default">close</button>
      </form>
    </dialog>
  )
}
  
export default RateLimitedUI
